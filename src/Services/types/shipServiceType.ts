import { shipRepositoryTypes } from "../../repositories/interfaces/IShipRepository"

export namespace shipServiceType {
    export type create = {
        name: string, 
        fuelCapacity: number, 
        fuelLevel: number, 
        weightCapacity: number,
        idPilot: number | null        
    }

    export type update = create & {
        idShip: number
    }

    export type selectAll = {
        name: string,
        fuelCapacity: number
        fuelLevel: number
        weightCapacity: number
        idPilot: number | null
        idShip: number | null
    }

    export type selectById = selectAll & {
        createdAt: Date
        updatedAt: Date | null
    }

    export type setShipOpenAndClose = {
        name: string
        pilotCertification: string
        idShip: number
    }

}