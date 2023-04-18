import { contractRepositoryTypes } from "../../repositories/interfaces/IContractRepository"
import { pilotRepositoryTypes } from "../../repositories/interfaces/IPilotRepository"



export namespace contractServicesTypes {
    export type create = {
        description: string
        originPlanet: string
        destinationPlanet: string
        idPilot: number | null
        value: number
    }

    export type update = create & {
        idContract: number
    }

    export type selectAll = contractRepositoryTypes.contractTypes

    export type select = selectAll
}