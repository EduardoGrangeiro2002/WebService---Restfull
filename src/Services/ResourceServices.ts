import { AppError } from "../configs/errors";
import { AppMessages, responseService } from "../configs/Messages";
import { Contract, Resource } from "../entities";
import { IContractRepository, IResourceRepository } from "../repositories/interfaces";
import { resourceServicesTypes } from "./types";

const RESOURCE_NAMES = ['minerals', 'water', 'food']
const ID_RESOURCE = null
const OPEN_STATUS = 1

export class ResourceServices {
    constructor(
        private readonly resourceRepository: IResourceRepository,
        private readonly contractRepository: IContractRepository
    ){}

    async create({idContract, name, weight}: resourceServicesTypes.create): Promise<responseService> {

        AppError.existsError(name, AppMessages.findMessage('ERR003'))
        AppError.existsError(idContract, AppMessages.findMessage('ERR026'))
        AppError.existsError(weight, AppMessages.findMessage('ERR030'))

        const resource = new Resource(ID_RESOURCE, idContract, name, weight)


        if(!resource.checkIfNameIsValidate(RESOURCE_NAMES)) throw new AppError(AppMessages.findMessage('ERR031'))

        const checkIfIdContractExists = await this.contractRepository.selectById(idContract)

        if(!checkIfIdContractExists) throw new AppError(AppMessages.findMessage('ERR027'))

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

        if(contract.getIdStatus() !== OPEN_STATUS) throw new AppError(AppMessages.findMessage('ERR032'))

       const payload = parseFloat(contract.getPayload().toString()) + parseFloat(resource.getWeight().toString())

       contract.setPayload(payload)

       const [, insertId] = await Promise.all([
        this.contractRepository.updateById({
            description: contract.getDescription(),
            destinationPlanet: contract.getDestinationPlanet(),
            idContract,
            idPilot: contract.getIdPilot(),
            idStatus: contract.getIdStatus(),
            originPlanet: contract.getOriginPlanet(),
            payload: contract.getPayload(),
            value: contract.getValue()
        }),
        this.resourceRepository.create({
            idContract,
            name: resource.getName(),
            weight: resource.getWeight()
        })
       ])

       const msg = AppMessages.findMessage('MSG012')

       return AppMessages.sendMessageService(msg, {id: insertId})
    }

    async updateById({ idContract, idResource, name, weight }: resourceServicesTypes.update): Promise<responseService> {

        AppError.existsError(name, AppMessages.findMessage('ERR003'))
        AppError.existsError(idContract, AppMessages.findMessage('ERR026'))
        AppError.existsError(weight, AppMessages.findMessage('ERR030'))
        AppError.existsError(idResource, AppMessages.findMessage('ERR033'))

        const resource = new Resource(ID_RESOURCE, idContract, name, weight)

        if(!resource.checkIfNameIsValidate(RESOURCE_NAMES)) throw new AppError(AppMessages.findMessage('ERR031'))

        const checkIfIdResourceExists = await this.resourceRepository.selectById(idResource)

        const checkIfIdContractExists = await this.contractRepository.selectById(idContract)

        if(!checkIfIdContractExists) throw new AppError(AppMessages.findMessage('ERR027'))

        if(!checkIfIdResourceExists) throw new AppError(AppMessages.findMessage('ERR034'))

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

        if(contract.getIdStatus() !== OPEN_STATUS) throw new AppError(AppMessages.findMessage('ERR032'))

       const payload = parseInt(contract.getPayload().toString()) + (parseInt(resource.getWeight().toString()) - parseFloat(checkIfIdResourceExists.weight.toString()))

       contract.setPayload(payload)

       const [, insertId] = await Promise.all([
        this.contractRepository.updateById({
            description: contract.getDescription(),
            destinationPlanet: contract.getDestinationPlanet(),
            idContract,
            idPilot: contract.getIdPilot(),
            idStatus: contract.getIdStatus(),
            originPlanet: contract.getOriginPlanet(),
            payload: contract.getPayload(),
            value: contract.getValue()
        }),
        this.resourceRepository.update({
            idResource,
            idContract,
            name: resource.getName(),
            weight: resource.getWeight()
        })
       ])

       const msg = AppMessages.findMessage('MSG013')

       return AppMessages.sendMessageService(msg, {id: insertId})
    }

    async selectAll(): Promise<resourceServicesTypes.select[]> {
        const resources = await this.resourceRepository.selectAll()

        if(!resources) return resources

        return resources
    }

    async selectById(idResource: number): Promise<resourceServicesTypes.select> {

        AppError.existsError(idResource, AppMessages.findMessage('ERR033'))

        const resource = await this.resourceRepository.selectById(idResource)

        if(!resource) throw new AppError(AppMessages.findMessage('ERR034'))

        return resource
    }

    async deleteById(idResource: number): Promise<responseService> {
        AppError.existsError(idResource, AppMessages.findMessage('ERR033')) 

        const checkIfIdResourceExists = await this.resourceRepository.selectById(idResource)

        if(!checkIfIdResourceExists) throw new AppError(AppMessages.findMessage('ERR034'))

        const getContract = await this.contractRepository.selectById(checkIfIdResourceExists.idContract)
        if(!getContract) throw new AppError(AppMessages.findMessage(''))
        const contract = new Contract(
            getContract.idContract, 
            getContract.description, 
            getContract.payload,
            getContract.originPlanet,
            getContract.destinationPlanet,
            getContract.idPilot,
            getContract.idStatus,
            getContract.value
            )

        contract.setPayload(parseFloat(contract.getPayload().toString()) - parseFloat(checkIfIdResourceExists.weight.toString()))
        
        const [, deletedId] = await Promise.all([
            this.contractRepository.updateById({
                description: contract.getDescription(),
                destinationPlanet: contract.getDestinationPlanet(),
                idContract: getContract.idContract,
                idPilot: contract.getIdPilot(),
                idStatus: contract.getIdStatus(),
                originPlanet: contract.getOriginPlanet(),
                payload: contract.getPayload(),
                value: contract.getValue()
            }),
            this.resourceRepository.delete(idResource)
        ])

        const msg = AppMessages.findMessage('MSG014')

        return AppMessages.sendMessageService(msg, {id: deletedId})
    }
}



