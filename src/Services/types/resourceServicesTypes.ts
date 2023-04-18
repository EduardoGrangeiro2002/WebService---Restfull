import { resourceRepositoryTypes } from "../../repositories/interfaces/IResourceRepository"



export namespace resourceServicesTypes {
    export type create = {
        idContract: number
        name: 'minerals' | 'water' | 'food',
        weight: number
    }

    export type update = create & {
        idResource: number
    }

    export type select = resourceRepositoryTypes.resourceType

}