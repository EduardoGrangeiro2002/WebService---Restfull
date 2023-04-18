import { pilotRepositoryTypes } from "./IPilotRepository"

export namespace contractRepositoryTypes {
    export type create = {
        description: string
        payload: number
        originPlanet: string
        destinationPlanet: string
        idStatus: number
        idPilot: number | null
        value: number
    }

    export type update = create & {
        idContract: number
    }

    export type contractTypes = update & {
        pilot: pilotRepositoryTypes.pilotTypes
        status: {
            idStatus:number
            status: string
        }
        createdAt: Date
        updatedAt: Date
    } 
}


export interface IContractRepository {
    create({ description, payload, originPlanet, destinationPlanet, idStatus, idPilot, value}: contractRepositoryTypes.create): Promise<number>

    updateById({ idContract ,description, payload, originPlanet, destinationPlanet, idStatus, idPilot, value }: contractRepositoryTypes.update): Promise<number>

    selectAll(): Promise<contractRepositoryTypes.contractTypes[]>

    selectById(idContract: number): Promise<contractRepositoryTypes.contractTypes | null>

    selectByDescription(description: string): Promise<contractRepositoryTypes.contractTypes | null>

    selectByOpenStatus(idStatus: number): Promise<contractRepositoryTypes.contractTypes[]>

    selectByIdPilot(idPilot: number) : Promise<contractRepositoryTypes.contractTypes[]>

    selectByIdPilotAndClosedStatus(idPilot: number) : Promise<contractRepositoryTypes.contractTypes[]>

    delete(idContract: number): Promise<number>
}