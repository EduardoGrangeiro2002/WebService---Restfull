
export namespace resourceRepositoryTypes {
    export type create = {
        idContract: number
        name: string
        weight: number
    }

    export type update = create & {
        idResource: number
    }

    export type resourceType = {
        idResource: number
        idContract: number
        contract: {
            description: string
        }
        name: string
        weight: number
    }
    export type resourceReportType = {
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


export interface IResourceRepository {
    create({ idContract, name, weight }: resourceRepositoryTypes.create): Promise<number>

    update({ idResource, idContract, name, weight }: resourceRepositoryTypes.update): Promise<number>

    selectAll(): Promise<resourceRepositoryTypes.resourceType[]>

    selectById(idResource: number): Promise<resourceRepositoryTypes.resourceType | null>

    delete(idResource: number): Promise<number>

    selectSuppliesPlanetReport(): Promise<resourceRepositoryTypes.resourceReportType[]>

    selectByIdsContracts(idsContracts: number[]): Promise<resourceRepositoryTypes.resourceReportType[]>
}