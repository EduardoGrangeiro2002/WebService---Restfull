import { pilotRepositoryTypes } from "../repositories/interfaces/IPilotRepository"

export namespace mapper  {
    export type contractResponse = {
        idContract: number
        description: string
        originPlanet: string
        destinationPlanet: string
        value: number
        payload: number
        idPilot: number | null
        pilotName?: string
        idStatus: number
        status: string
    }

    export type contractRequest = {
        idContract: number
        description: string
        originPlanet: string
        destinationPlanet: string
        value: number
        payload: number
        idPilot: number | null
        pilot: pilotRepositoryTypes.pilotTypes
        idStatus: number
        status: {
            idStatus: number
            status: string
        }
    }
}


export function contractMapper (contract: mapper.contractRequest): mapper.contractResponse {
    let contractResponse: mapper.contractResponse = {
        idContract: contract.idContract,
        description: contract.description,
        originPlanet: contract.originPlanet,
        value: contract.value,
        destinationPlanet: contract.destinationPlanet,
        payload: contract.payload,
        idStatus: contract.idStatus,
        status: contract.status.status,
        idPilot: contract.idPilot
    }

    if(contractResponse.idPilot) contractResponse.pilotName = contract.pilot.name

    return contractResponse
}