export namespace shipRepositoryTypes {
    export type create = {
        name: string,
        fuelCapacity: number
        fuelLevel: number
        weightCapacity: number
        idPilot: number | null
    }

    export type update = create & {
        idShip: number
    }

    export type shipTypes = update & {
        createdAt: Date
        updatedAt: Date | null
    }
}


export interface IShipRepository {
    create({name, fuelCapacity, fuelLevel, weightCapacity, idPilot}: shipRepositoryTypes.create): Promise<number>
    
    update({idShip, name, fuelCapacity, fuelLevel, idPilot, weightCapacity}: shipRepositoryTypes.update): Promise<number>
    
    selectAll(): Promise<shipRepositoryTypes.shipTypes[]>
    
    selectById(idShip: number): Promise<shipRepositoryTypes.shipTypes | null>
    
    selectByName(name: string): Promise<shipRepositoryTypes.shipTypes | null >
    
    delete(idShip: number): Promise<number>

    selectAllOpenShip(): Promise<shipRepositoryTypes.shipTypes[] | null>

    setIdPilotInShip(idPilot: number | null, idShip: number): Promise<number>

    selectByIdPilot(idPilot: number): Promise<shipRepositoryTypes.shipTypes | null>
}