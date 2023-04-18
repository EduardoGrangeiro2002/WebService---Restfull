import { ship } from "../../entities/Ship";
import { IShipRepository } from "../interfaces";
import { shipRepositoryTypes } from "../interfaces/IShipRepository";



export class ShipRepositoryInMemory implements IShipRepository {
    private ships: ship[] = []
    private idCount: number = 1

    async create({ name, fuelCapacity, fuelLevel, weightCapacity, idPilot }: shipRepositoryTypes.create): Promise<number> {
        const ship: ship = {
            idShip: this.idCount,
            name,
            fuelCapacity,
            fuelLevel,
            idPilot,
            weightCapacity,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        this.ships.push(ship)

        return ship.idShip
    }
    async update({ idShip, name, fuelCapacity, fuelLevel, idPilot, weightCapacity }: shipRepositoryTypes.update): Promise<number> {
        const ship = this.ships.find( ele => ele.idShip === idShip)
        const findIndex = this.ships.findIndex( ele => ele.idShip === idShip)

        if(!ship) return 0 

        this.ships[findIndex] = {
            createdAt: ship.createdAt,
            fuelCapacity,
            fuelLevel,
            idPilot,
            idShip,
            name,
            updatedAt: new Date(),
            weightCapacity
        }

        return idShip
    }
    async selectAll(): Promise<shipRepositoryTypes.shipTypes[]> {
        return this.ships
    }
    async selectById(idShip: number): Promise<shipRepositoryTypes.shipTypes | null> {
        const findShip = this.ships.find( (ele) => ele.idShip === idShip)

        if(!findShip) return null

        return findShip
    }
    async selectByName(name: string): Promise<shipRepositoryTypes.shipTypes | null> {
        const findShip = this.ships.find( (ele) => ele.name === name)

        if(!findShip) return null

        return findShip    
    }
    async delete(idShip: number): Promise<number> {
        const findIndex = this.ships.findIndex( ele => ele.idShip === idShip)

        this.ships.splice(findIndex, 1)

        return idShip
    }
    async selectAllOpenShip(): Promise<shipRepositoryTypes.shipTypes[] | null> {
        const findShip = this.ships.filter( (ele) => ele.idShip === null)

        if(!findShip) return null

        return findShip
    }
    async setIdPilotInShip(idPilot: number | null, idShip: number): Promise<number> {
        throw new Error("Method not implemented.");
    }
    async selectByIdPilot(idPilot: number): Promise<shipRepositoryTypes.shipTypes | null> {
        const findShip = this.ships.find( (ele) => ele.idPilot === idPilot)

        if(!findShip) return null

        return findShip
    }

}