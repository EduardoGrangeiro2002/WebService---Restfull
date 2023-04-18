import { resource } from "../../entities/Resource";
import { IContractRepository, IResourceRepository } from "../interfaces";
import { resourceRepositoryTypes } from "../interfaces/IResourceRepository";
import { ContractRepositoryInMemory } from "./ContractRepositoryInMemory";

const CLOSED_STATUS = 3
export class ResourceRepositoryInMemory implements IResourceRepository {
    private resources: resource[] = []
    private idCount: number = 1

    constructor(private contractRepositoryInMemory?: IContractRepository) { }

    async create({ idContract, name, weight }: resourceRepositoryTypes.create): Promise<number> {
        const resource: resource = {
            idContract,
            idResource: this.idCount,
            name,
            weight
        }

        this.resources.push(resource)
        this.idCount += 1

        return resource.idResource
    }
    async update({ idResource, idContract, name, weight }: resourceRepositoryTypes.update): Promise<number> {
        const resource = this.resources.find(ele => ele.idResource === idResource)
        const findIndex = this.resources.findIndex(ele => ele.idResource)
        if (!resource) return 0

        this.resources[findIndex] = {
            idContract,
            idResource,
            name,
            weight
        }

        return idResource
    }
    async selectAll(): Promise<resourceRepositoryTypes.resourceType[]> {
        return this.resources as unknown as resourceRepositoryTypes.resourceType[]
    }
    async selectById(idResource: number): Promise<resourceRepositoryTypes.resourceType | null> {
        const findResource = this.resources.find((ele) => ele.idResource === idResource)

        if (!findResource) return null

        return findResource as unknown as resourceRepositoryTypes.resourceType
    }
    async delete(idResource: number): Promise<number> {
        const findIndex = this.resources.findIndex(ele => ele.idResource)

        this.resources.splice(findIndex, 1)
        this.idCount -= 1
        return idResource
    }
    async selectSuppliesPlanetReport(): Promise<resourceRepositoryTypes.resourceReportType[]> {
        const contracts = await this.contractRepositoryInMemory?.selectByOpenStatus(CLOSED_STATUS)
        const idContracts: number[] = []
        contracts?.forEach(ele => idContracts.push(ele.idContract))

        let resources = await this.selectByIdsContracts(idContracts)
        const report: resourceRepositoryTypes.resourceReportType[] = []
        if (contracts) {
            for (const contract of contracts) {
                resources.forEach(resource => {
                    if (contract.idContract === resource.idContract) {
                       
                        resource.contract = {
                            originPlanet: contract.originPlanet,
                            destinationPlanet: contract.destinationPlanet
                        }
                        report.push(resource)
                    }
                })
            }
        }
        return report
    }
    async selectByIdsContracts(idsContracts: number[]): Promise<resourceRepositoryTypes.resourceReportType[]> {
        const resources: resource[] = []
        idsContracts.forEach(idContract => {
            this.resources.forEach(ele => {
                if (ele.idContract === idContract) {
                    resources.push(ele)
                }
            })
        })

        return resources as unknown as resourceRepositoryTypes.resourceReportType[]
    }

}