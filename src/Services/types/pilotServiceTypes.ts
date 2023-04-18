import { pilotRepositoryTypes } from "../../repositories/interfaces/IPilotRepository"

export namespace pilotServiceTypes {
    export type create = {
        name: string 
        pilotCertification: string
        age: number
        credits: number
        locationPlanet: string
    }

    export type update = {
        idPilot: number
        name: string 
        pilotCertification: string
        age: number
        credits: number
        locationPlanet: string
    }

    export type selectAll = pilotRepositoryTypes.pilotTypes[]

    export type selectById = pilotRepositoryTypes.pilotTypes

}