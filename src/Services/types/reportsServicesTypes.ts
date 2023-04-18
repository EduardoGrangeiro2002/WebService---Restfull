import { pilotRepositoryTypes } from "../../repositories/interfaces/IPilotRepository"

export namespace reporsServicesType {
    export type transaction = {
        idTransaction: number,
        description: string,
        value: number
    }
    
    export type resources = {
        idResource: number
        idContract: number
        contract: {
            originPlanet: string
            destinationPlanet: string
        }
        name: string
        weight: number
    }
}
