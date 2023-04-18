import { Pilot } from "../../entities"

export namespace pilotRepositoryTypes {
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

    export type pilotTypes = {
        idPilot: number
        name: string
        pilotCertification: string
        age: number
        credits: number
        locationPlanet: 'Andvari' | 'Demeter' | 'Aqua' | 'Calas'
        createdAt: Date
        updatedAt?: Date
    }
}

export interface IPilotRepository {
     create({name, pilotCertification, age, credits, locationPlanet}: pilotRepositoryTypes.create): Promise<number>

     update({idPilot, name, pilotCertification, age, credits, locationPlanet}: pilotRepositoryTypes.update): Promise<number>

     selectAll(): Promise<pilotRepositoryTypes.pilotTypes[]>

     selectByPilotCertificaiton(pilotCertification: string): Promise<pilotRepositoryTypes.pilotTypes | null>

     selectByPilotName(name: string): Promise<pilotRepositoryTypes.pilotTypes | null>

     selectById(idPilot: number): Promise<pilotRepositoryTypes.pilotTypes | null>

     delete(idPilot: number): Promise<number>
}