import { AppError } from "../configs/errors";
import { AppMessages, responseService } from "../configs/Messages";
import { Pilot, Ship, Transaction, Travel } from "../entities";
import { shipDTO } from "../entities/Ship";
import { IPilotRepository, IShipRepository, ITransactionRepository } from "../repositories/interfaces";
import { shipServiceType } from "./types";

const FUEL_UNIT_COSTS = 7
const DESCRIPTION_TRANSACTION = ' bought fuel'
const ID_TRANSACTION = null

type planets = 'Andvari' | 'Demeter' | 'Aqua' | 'Calas'

export class ShipService {
    constructor(
        private readonly pilotRepository: IPilotRepository,
        private readonly shipRepository: IShipRepository,
        private readonly transactionRepository: ITransactionRepository
    ) {}

    async create({ name, fuelCapacity, fuelLevel, weightCapacity, idPilot }: shipServiceType.create): Promise<responseService> {
        AppError.existsError(name, AppMessages.findMessage('ERR003'))
        AppError.existsError(fuelCapacity, AppMessages.findMessage('ERR015'))
        AppError.existsError(fuelLevel, AppMessages.findMessage('ERR016'))
        AppError.existsError(weightCapacity, AppMessages.findMessage('ERR017'))
        idPilot = idPilot || null
        
        if(idPilot) {
            const checkIfIdPilotExists = await this.pilotRepository.selectById(idPilot)
            if(!checkIfIdPilotExists) throw new AppError(AppMessages.findMessage('ERR014'))
        }

        const ship = new Ship(null, name, fuelCapacity, fuelLevel, weightCapacity, idPilot)

        const checkIfShipNameExists = await this.shipRepository.selectByName(ship.getName())
        
        if(checkIfShipNameExists) throw new AppError(AppMessages.findMessage('ERR011'))

        const insertId = await this.shipRepository.create({name, fuelCapacity, fuelLevel, weightCapacity, idPilot})

        const msg = AppMessages.findMessage('MSG004')

        return AppMessages.sendMessageService(msg, {id: insertId})
    }

    async selectAll(): Promise<shipServiceType.selectAll[] | null> {
        const ships = await this.shipRepository.selectAll()

        if(!ships) return ships
        
        const shipsDTO = getShipsDTO(ships)

        return shipsDTO
    }

    async selectById(idShip: number): Promise<shipServiceType.selectById> {
        AppError.existsError(idShip, AppMessages.findMessage('ERR018'))

        const ship = await this.shipRepository.selectById(idShip)

        if(!ship) throw new AppError(AppMessages.findMessage('ERR019'))

        return ship
    }

    async updateById({ idShip, name, fuelCapacity, fuelLevel, weightCapacity, idPilot }: shipServiceType.update ): Promise<responseService> {
        AppError.existsError(idShip, AppMessages.findMessage('ERR018'))
        AppError.existsError(name, AppMessages.findMessage('ERR003'))
        AppError.existsError(fuelCapacity, AppMessages.findMessage('ERR015'))
        AppError.existsError(fuelLevel, AppMessages.findMessage('ERR016'))
        AppError.existsError(weightCapacity, AppMessages.findMessage('ERR017'))
        idPilot = idPilot || null

        if(idPilot) {
            const checkIfIdPilotExists = await this.pilotRepository.selectById(idPilot)
            if(!checkIfIdPilotExists) throw new AppError(AppMessages.findMessage('ERR014'))
        }

        const ship = new Ship(idShip, name, fuelCapacity, fuelLevel, weightCapacity, idPilot)

        const checkIfShipNameExists = await this.shipRepository.selectByName(ship.getName())
        const checkIfShipExists = await this.shipRepository.selectById(idShip)

        if(checkIfShipNameExists && checkIfShipNameExists.idShip !== idShip) throw new AppError(AppMessages.findMessage('ERR011'))
        if(!checkIfShipExists) throw new AppError(AppMessages.findMessage('ERR019'))

        const updatedId = await this.shipRepository.update({idShip, name, fuelCapacity, fuelLevel, weightCapacity, idPilot})

        const msg = AppMessages.findMessage('MSG005')

        return AppMessages.sendMessageService(msg, {id: updatedId})
    }

    public async deleteById(idShip: number): Promise<responseService> {
        AppError.existsError(idShip, AppMessages.findMessage('ERR018'))
        
        const checkIfShipExists = await this.shipRepository.selectById(idShip)

        if(!checkIfShipExists) throw new AppError(AppMessages.findMessage('ERR019'))

        const deletedId = await this.shipRepository.delete(idShip)

        const msg = AppMessages.findMessage('MSG006')

        return AppMessages.sendMessageService(msg, {id: deletedId})
    }

    async selectOpenShip(): Promise<shipServiceType.selectAll[] | null> {
        const ships = await this.shipRepository.selectAllOpenShip()

        if(!ships) return ships

        const shipsDTO = getShipsDTO(ships)

        return shipsDTO
    }

    async setCloseShip({name, pilotCertification, idShip}: shipServiceType.setShipOpenAndClose) {

        AppError.existsError(name, AppMessages.findMessage('ERR003'))
        AppError.existsError(pilotCertification, AppMessages.findMessage('ERR002'))
        AppError.existsError(idShip, AppMessages.findMessage('ERR018'))

        const checkIfNamePilotExists = await this.pilotRepository.selectByPilotName(name)
        const checkIfPilotCertficationPilotExists = await  this.pilotRepository.selectByPilotCertificaiton(pilotCertification)
        const checkIfIdShipExists = await this.shipRepository.selectById(idShip)

        if(!checkIfIdShipExists) throw new AppError(AppMessages.findMessage('ERR019'))
        if(!checkIfNamePilotExists) throw new AppError(AppMessages.findMessage('ERR014'))
        if(!checkIfPilotCertficationPilotExists) throw new AppError(AppMessages.findMessage('ERR014'))
        
        if(checkIfNamePilotExists.idPilot !== checkIfPilotCertficationPilotExists.idPilot) throw new AppError(AppMessages.findMessage('ERR019'))

        if(checkIfIdShipExists.idPilot !== null && checkIfIdShipExists.idPilot !== checkIfPilotCertficationPilotExists.idPilot) 
            throw new AppError(AppMessages.findMessage('ERR020'))

        const checkIfPilotAlreadyAllocatedShip = await this.shipRepository.selectByIdPilot(checkIfNamePilotExists.idPilot)

        if(checkIfPilotAlreadyAllocatedShip) throw new AppError(AppMessages.findMessage('ERR021'))

        const updatedId = await this.shipRepository.setIdPilotInShip(checkIfNamePilotExists.idPilot, idShip)

        const msg = AppMessages.findMessage('MSG007')

        return AppMessages.sendMessageService(msg, {idShip: updatedId, idPilot: checkIfNamePilotExists.idPilot})
    }

    async setOpenShip(idShip: number) {
        AppError.existsError(idShip, AppMessages.findMessage('ERR018'))

        const checkIfIdShipExists = await this.shipRepository.selectById(idShip)

        if(!checkIfIdShipExists) throw new AppError(AppMessages.findMessage('ERR019'))

        const updatedId = await this.shipRepository.setIdPilotInShip(null, idShip)

        const msg = AppMessages.findMessage('MSG008')

        return AppMessages.sendMessageService(msg, {idShip: updatedId})
    }

    async fuel(idShip: number, fuelQuantity: number): Promise<responseService> {
        AppError.existsError(idShip, AppMessages.findMessage('ERR018'))
        AppError.existsError(fuelQuantity, AppMessages.findMessage('ERR039'))

        const checkIfIdShipExists = await this.shipRepository.selectById(idShip)

        if(!checkIfIdShipExists) throw new AppError(AppMessages.findMessage('ERR019'))
        if(!checkIfIdShipExists.idPilot) throw new AppError(AppMessages.findMessage('ERR014'))
        const checkIfPilotExists = await this.pilotRepository.selectById(checkIfIdShipExists.idPilot)
        
        if(!checkIfPilotExists) throw new AppError(AppMessages.findMessage('ERR014'))

        const pilot = new Pilot(
            checkIfPilotExists.name,
            checkIfPilotExists.pilotCertification,
            checkIfPilotExists.age,
            checkIfPilotExists.credits,
            checkIfPilotExists.locationPlanet
        )

        const ship = new Ship(
            idShip,
            checkIfIdShipExists.name,
            checkIfIdShipExists.fuelCapacity,
            checkIfIdShipExists.fuelLevel,
            checkIfIdShipExists.weightCapacity,
            checkIfIdShipExists.idPilot
        )

        const necessaryCreditsForFuel = fuelQuantity * FUEL_UNIT_COSTS

        if(pilot.getCredits() < necessaryCreditsForFuel) throw new AppError(AppMessages.findMessage('ERR040'))
        
        ship.setFuelLevel(parseInt(ship.getFuelLevel().toString()) + fuelQuantity)

        if(ship.getFuelLevel() > ship.getFuelCapacity()) throw new AppError(AppMessages.findMessage('ERR041'))

        pilot.setCredits(parseFloat(pilot.getCredits().toString()) - necessaryCreditsForFuel)

        const transaction = new Transaction(
            ID_TRANSACTION,
            pilot.getName() + DESCRIPTION_TRANSACTION,
            necessaryCreditsForFuel
        )

        const [, updatedId] = await Promise.all([
            this.pilotRepository.update({
                idPilot: checkIfPilotExists.idPilot,
                age: pilot.getAge(),
                credits: pilot.getCredits(),
                locationPlanet: pilot.getLocationPlanet(),
                name: pilot.getName(),
                pilotCertification: pilot.getPilotCertification()
            }),
            this.shipRepository.update({
                idShip,
                name: ship.getName(),
                fuelCapacity: ship.getFuelCapacity(),
                fuelLevel: ship.getFuelLevel(),
                idPilot: ship.getIdPilot(),
                weightCapacity: ship.getWeightCapacity()
            }),
            this.transactionRepository.create(
                transaction.getDescription(),
                transaction.getValue()
            )
          ]
        )

        const msg = AppMessages.findMessage('MSG016')

        return AppMessages.sendMessageService(msg, {id: updatedId})
    }

    async startTravel(idShip: number, destinationPlanet: planets): Promise<responseService> {
        const checkifIdShipExists = await this.shipRepository.selectById(idShip)

        if(!checkifIdShipExists) throw new AppError(AppMessages.findMessage('ERR019'))
        if(!checkifIdShipExists.idPilot) throw new AppError(AppMessages.findMessage('ERR042'))
        const getPilot = await this.pilotRepository.selectById(checkifIdShipExists.idPilot)
        if(!getPilot) throw new AppError(AppMessages.findMessage('ERR014'))
        
        const travel = new Travel(getPilot.locationPlanet)

        if(!travel.checkIfPlanetIsRegistry) throw new AppError(AppMessages.findMessage('ERR046')) 

        const ship = new Ship(
            checkifIdShipExists.idPilot,
            checkifIdShipExists.name,
            checkifIdShipExists.fuelCapacity,
            checkifIdShipExists.fuelLevel,
            checkifIdShipExists.weightCapacity,
            checkifIdShipExists.idPilot
        )
        const pilot = new Pilot(
            getPilot.name,
            getPilot.pilotCertification,
            getPilot.age,
            getPilot.credits,
            getPilot.locationPlanet
        )
        
        const costs = travel.calcFuel(destinationPlanet)

        if(costs === false) throw new AppError(AppMessages.findMessage('ERR043'))
        
        if(costs > ship.getFuelCapacity()) throw new AppError(AppMessages.findMessage('ERR044'))

        if(costs > ship.getFuelLevel()) throw new AppError(AppMessages.findMessage('ERR045'))

        ship.setFuelLevel(parseInt(ship.getFuelLevel().toString()) - costs)

        pilot.setLocationPlanet(destinationPlanet)

        await Promise.all(
            [
                this.shipRepository.update({
                    idShip: idShip,
                    name: ship.getName(),
                    fuelCapacity: ship.getFuelCapacity(),
                    fuelLevel: ship.getFuelLevel(),
                    idPilot: ship.getIdPilot(),
                    weightCapacity: ship.getWeightCapacity()
                }),
                this.pilotRepository.update({
                    idPilot: getPilot.idPilot,
                    name: pilot.getName(),
                    age: pilot.getAge(),
                    credits: pilot.getCredits(),
                    locationPlanet: pilot.getLocationPlanet(),
                    pilotCertification: pilot.getPilotCertification()
                })
            ]
        )

        const msg = AppMessages.findMessage('MSG017')

        return AppMessages.sendMessageService(msg, {})
    }
}

const getShipsDTO = (ships: shipServiceType.selectAll[]): shipDTO[] => {
    const shipsDTO = ships.map( (ele) => {
        return new Ship(ele.idShip, ele.name, ele.fuelCapacity, ele.fuelLevel, ele.weightCapacity, ele.idPilot).returnShipDTO()
    })

    return shipsDTO
}