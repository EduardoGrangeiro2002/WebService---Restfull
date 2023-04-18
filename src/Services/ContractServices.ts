import { AppError } from "../configs/errors";
import { AppMessages, responseService } from "../configs/Messages";
import { Contract, Pilot, Ship, Transaction } from "../entities";
import { contractMapper, mapper } from "../mappers";
import { IContractRepository, IPilotRepository, IShipRepository, ITransactionRepository } from "../repositories/interfaces";
import { contractServicesTypes } from "./types";

const OPEN_STATUS = 1
const IN_PROGRESS_STATUS = 2
const CLOSED_STATUS = 3
const PAYLOAD = 0.00
const ID_PILOT = null
const ID_CONTRACT =  null
const ID_TRANSACTION = null
const DESCRIPTION_TRANSACTION = ' paid'

export class ContractServices {
    constructor(
        private readonly contractRepository: IContractRepository,
        private readonly pilotRepository: IPilotRepository,
        private readonly shipRepository: IShipRepository,
        private readonly transactionRepository: ITransactionRepository
    ) {}
    
    async create({description, destinationPlanet, originPlanet, value}: contractServicesTypes.create): Promise<responseService> {
        AppError.existsError(description, AppMessages.findMessage('ERR022'))
        AppError.existsError(destinationPlanet, AppMessages.findMessage('ERR023'))
        AppError.existsError(originPlanet, AppMessages.findMessage('ERR024'))
        AppError.existsError(value, AppMessages.findMessage('ERR025'))

        const contract = new Contract(ID_CONTRACT, description, PAYLOAD, originPlanet, destinationPlanet, ID_PILOT, OPEN_STATUS, value)

        const checkIfDescriptionAlreadyUse = await this.contractRepository.selectByDescription(contract.getDescription())

        if(checkIfDescriptionAlreadyUse) throw new AppError(AppMessages.findMessage('ERR028'))

        const insertId = await this.contractRepository.create({
            description: contract.getDescription(),
            destinationPlanet: contract.getDestinationPlanet(),
            idPilot: contract.getIdPilot(),
            idStatus: contract.getIdStatus(),
            originPlanet: contract.getOriginPlanet(),
            payload: contract.getPayload(),
            value: contract.getValue()
        })

        const msg = AppMessages.findMessage('MSG009')

        return AppMessages.sendMessageService(msg, {id: insertId})
    }

    async selectAll(): Promise<mapper.contractResponse[]> {
        const contracts = await this.contractRepository.selectAll()

        if(!contracts) return contracts

        const result = getMapperForContracts(contracts)

        return result
    }

    async selectAllOpenContract(): Promise<mapper.contractResponse[]> {
        const contracts = await this.contractRepository.selectByOpenStatus(OPEN_STATUS)

        if(!contracts) return contracts

        const result = getMapperForContracts(contracts)

        return result
    }

    async selectById(idContract: number): Promise<mapper.contractResponse> {
        
        AppError.existsError(idContract, AppMessages.findMessage('ERR026'))

        const contract = await this.contractRepository.selectById(idContract)

        if(!contract) throw new AppError(AppMessages.findMessage('ERR027'))

        const result = contractMapper(contract)

        return result
    }

    async updateById({idContract, description, destinationPlanet, originPlanet, value}: contractServicesTypes.update): Promise<responseService> {
        AppError.existsError(idContract, AppMessages.findMessage('ERR026'))
        AppError.existsError(description, AppMessages.findMessage('ERR022'))
        AppError.existsError(destinationPlanet, AppMessages.findMessage('ERR023'))
        AppError.existsError(originPlanet, AppMessages.findMessage('ERR024'))
        AppError.existsError(value, AppMessages.findMessage('ERR025'))

        const contract = new Contract(idContract, description, PAYLOAD, originPlanet, destinationPlanet, ID_PILOT, OPEN_STATUS, value)

        const checkIfIdContractExists = await this.contractRepository.selectById(idContract)
        const checkIfDescriptionAlreadyUse = await this.contractRepository.selectByDescription(contract.getDescription())

        if(!checkIfIdContractExists) throw new AppError(AppMessages.findMessage('ERR027'))


        if(checkIfDescriptionAlreadyUse &&  checkIfDescriptionAlreadyUse.idContract !== checkIfIdContractExists.idContract)
             throw new AppError(AppMessages.findMessage('ERR028'))

        if(checkIfIdContractExists.idStatus !== OPEN_STATUS) throw new AppError(AppMessages.findMessage('ERR029'))

        const updatedId = await this.contractRepository.updateById({
            idContract,
            description: contract.getDescription(),
            destinationPlanet: contract.getDestinationPlanet(),
            idPilot: contract.getIdPilot(),
            idStatus: contract.getIdStatus(),
            originPlanet: contract.getOriginPlanet(),
            payload: contract.getPayload(),
            value: contract.getValue()
        })

        const msg = AppMessages.findMessage('MSG010')

        return AppMessages.sendMessageService(msg, {id: updatedId})
    }

    async deleteById(idContract: number): Promise<responseService> {
        const checkIfIdContractExists = await this.contractRepository.selectById(idContract)
        
        if(!checkIfIdContractExists) throw new AppError(AppMessages.findMessage('ERR027'))

        const deletedId = await this.contractRepository.delete(idContract)

        const msg = AppMessages.findMessage('MSG011')

        return AppMessages.sendMessageService(msg, {id: deletedId})
    }

    async acceptContracts(idPilot: number, idContract: number): Promise<responseService> {
        AppError.existsError(idPilot, AppMessages.findMessage('ERR013'))
        AppError.existsError(idContract, AppMessages.findMessage('ERR026'))

        const checkIfIdContractExists = await this.contractRepository.selectById(idContract)
        const checkIfIdPilotExists = await this.pilotRepository.selectById(idPilot)
        const checkIfPilotHaveShip = await this.shipRepository.selectByIdPilot(idPilot)
        const checkIfPilotAlreadyAcceptOthersContracts = await this.contractRepository.selectByIdPilot(idPilot)

        if(!checkIfIdContractExists) throw new AppError(AppMessages.findMessage('ERR027'))
        if(!checkIfIdPilotExists) throw new AppError(AppMessages.findMessage('ERR014'))
        if(!checkIfPilotHaveShip) throw new AppError(AppMessages.findMessage('ERR036'))
        if(checkIfPilotAlreadyAcceptOthersContracts.find( (ele) => ele.idStatus === IN_PROGRESS_STATUS)) throw new AppError(AppMessages.findMessage('ERR038'))

        const contract = new Contract(
            checkIfIdContractExists.idContract,
            checkIfIdContractExists.description,
            checkIfIdContractExists.payload,
            checkIfIdContractExists.originPlanet,
            checkIfIdContractExists.destinationPlanet,
            checkIfIdContractExists.idPilot,
            checkIfIdContractExists.idStatus,
            checkIfIdContractExists.value
        )

        const ship = new Ship(
            checkIfPilotHaveShip.idShip,
            checkIfPilotHaveShip.name,
            checkIfPilotHaveShip.fuelCapacity,
            checkIfPilotHaveShip.fuelLevel,
            checkIfPilotHaveShip.weightCapacity,
            checkIfPilotHaveShip.idPilot
        )

        const pilot = new Pilot(
            checkIfIdPilotExists.name,
            checkIfIdPilotExists.pilotCertification,
            checkIfIdPilotExists.age,
            checkIfIdPilotExists.credits,
            checkIfIdPilotExists.locationPlanet
        )

        if(contract.getOriginPlanet() !== pilot.getLocationPlanet()) throw new AppError(AppMessages.findMessage('ERR035'))
        
        if(contract.getPayload() > ship.getWeightCapacity()) throw new AppError(AppMessages.findMessage('ERR037'))

        contract.setIdStatus(IN_PROGRESS_STATUS)
        contract.setIdPilot(idPilot)

        const updatedId = await this.contractRepository.updateById({
            description: contract.getDescription(),
            destinationPlanet: contract.getDestinationPlanet(),
            idContract: idContract,
            idPilot: contract.getIdPilot(),
            idStatus: contract.getIdStatus(),
            originPlanet: contract.getOriginPlanet(),
            payload: contract.getPayload(),
            value: contract.getValue()
        })

        const msg = AppMessages.findMessage('MSG015')

        return AppMessages.sendMessageService(msg, {id: updatedId})
    }

    async deliverContracts(idPilot: number, idContract: number): Promise<responseService> {
        AppError.existsError(idPilot, AppMessages.findMessage('ERR013'))
        AppError.existsError(idContract, AppMessages.findMessage('ERR026'))

        const checkIfIdContractExists = await this.contractRepository.selectById(idContract)
        const checkIfIdPilotExists = await this.pilotRepository.selectById(idPilot)

        if(!checkIfIdContractExists) throw new AppError(AppMessages.findMessage('ERR027'))
        if(!checkIfIdPilotExists) throw new AppError(AppMessages.findMessage('ERR014'))

        const contract = new Contract(
            checkIfIdContractExists.idContract,
            checkIfIdContractExists.description,
            checkIfIdContractExists.payload,
            checkIfIdContractExists.originPlanet,
            checkIfIdContractExists.destinationPlanet,
            checkIfIdContractExists.idPilot,
            checkIfIdContractExists.idStatus,
            checkIfIdContractExists.value
        )

        const pilot = new Pilot(
            checkIfIdPilotExists.name,
            checkIfIdPilotExists.pilotCertification,
            checkIfIdPilotExists.age,
            checkIfIdPilotExists.credits,
            checkIfIdPilotExists.locationPlanet
        )

        if(contract.getDestinationPlanet() !== pilot.getLocationPlanet()) throw new AppError(AppMessages.findMessage('ERR035'))
        
        contract.setIdStatus(CLOSED_STATUS)
        contract.setIdPilot(idPilot)

        pilot.setCredits(parseFloat(pilot.getCredits().toString()) + parseFloat(contract.getValue().toString()))

        const transaction = new Transaction(
            ID_TRANSACTION,
            contract.getDescription() + DESCRIPTION_TRANSACTION,
            - contract.getValue()
        )

        const [updatedId] = await Promise.all([
           this.contractRepository.updateById({
                description: contract.getDescription(),
                destinationPlanet: contract.getDestinationPlanet(),
                idContract: idContract,
                idPilot: contract.getIdPilot(),
                idStatus: contract.getIdStatus(),
                originPlanet: contract.getOriginPlanet(),
                payload: contract.getPayload(),
                value: contract.getValue()
            }),
            this.pilotRepository.update({
                idPilot,
                age: pilot.getAge(),
                credits: pilot.getCredits(),
                locationPlanet: pilot.getLocationPlanet(),
                name: pilot.getName(),
                pilotCertification: pilot.getPilotCertification()
            }),
            this.transactionRepository.create(
                transaction.getDescription(),
                transaction.getValue()
            )
        ])
        const msg = AppMessages.findMessage('MSG018')

        return AppMessages.sendMessageService(msg, {id: updatedId})
    }
}

const getMapperForContracts = (contracts: contractServicesTypes.selectAll[]) => {
    const result = contracts.map((contract) => {
        return contractMapper(contract)
    })

    return result
}