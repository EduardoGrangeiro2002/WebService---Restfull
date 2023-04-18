import { PrismaClient } from "@prisma/client";
import { IResourceRepository } from "../interfaces";
import { resourceRepositoryTypes } from "../interfaces/IResourceRepository";

const CLOSED_STATUS = 3

export class ResourceRepository implements IResourceRepository {
    private prismaClient: PrismaClient

    constructor () {
        this.prismaClient = new PrismaClient()
    }
    async selectByIdsContracts(idsContracts: number[]): Promise<resourceRepositoryTypes.resourceReportType[]> {
        const resource =  await this.prismaClient.resource.findMany({
            where: {
                idContract: {in: idsContracts}
            },
            select: {
                idResource: true,     
                name: true,
                weight: true,
                idContract: true,
            }
        })

        return resource as unknown as resourceRepositoryTypes.resourceReportType[]
    }
    async selectSuppliesPlanetReport(): Promise<resourceRepositoryTypes.resourceReportType[]> {
        const resource =  await this.prismaClient.resource.findMany({
            where: {
                contract: {
                    idStatus: CLOSED_STATUS
                }
            },
            select: {
                idResource: true,     
                name: true,
                weight: true,
                idContract: true,
                contract: {
                    select: {
                        originPlanet: true,
                        destinationPlanet: true,
                    }
                }
            }
        })

        return resource as unknown as resourceRepositoryTypes.resourceReportType[]
    }
    async create({ idContract, name, weight }: resourceRepositoryTypes.create): Promise<number> {
        const insertId = await this.prismaClient.resource.create({
            data: {
                idContract,
                name,
                weight
            },
            select: {idResource: true}
        })

        return insertId.idResource
    }
    async update({ idResource, idContract, name, weight }: resourceRepositoryTypes.update): Promise<number> {
        const updatedId = await this.prismaClient.resource.update({
            where: {idResource},
            data: {
                idContract,
                name,
                weight
            },
            select: {idResource: true}
        })
        return updatedId.idResource
    }
    async selectAll(): Promise<resourceRepositoryTypes.resourceType[]> {
        const resources = await this.prismaClient.resource.findMany({
            select: {
                idResource: true,     
                name: true,
                weight: true,
                idContract: true,
                contract: {select: {description: true}},
            }
        })

        return resources as unknown as resourceRepositoryTypes.resourceType[]
    }
    async selectById(idResource: number): Promise<resourceRepositoryTypes.resourceType | null> {
        const resource = await this.prismaClient.resource.findUnique(
            {
                where: {idResource},
                select:{
                idResource: true,     
                name: true,
                weight: true,
                idContract: true,
                contract: {select: {description: true}},
                }
            }
        )

        if(!resource) return resource

        return resource as unknown as resourceRepositoryTypes.resourceType
    }
    async delete(idResource: number): Promise<number> {
        const deletedId = await this.prismaClient.resource.delete({
            where: {idResource},
            select: {
                idResource: true
            }
        })

        return deletedId.idResource
    }


}