import { Decimal } from "@prisma/client/runtime";
import { contract } from "../../entities/Contract";
import { IContractRepository } from "../interfaces";
import { contractRepositoryTypes } from "../interfaces/IContractRepository";

const CLOSED_STATUS = 3

export class ContractRepositoryInMemory implements IContractRepository {
    private contracts: contract[] = []
    private idCount: number = 1

    async create({ description, payload, originPlanet, destinationPlanet, idStatus, idPilot, value }: contractRepositoryTypes.create): Promise<number> {
        const contract: contract = {
            description,
            payload,
            originPlanet,
            destinationPlanet,
            idContract: this.idCount,
            idPilot,
            idStatus,
            value,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        this.contracts.push(contract)
        this.idCount += 1
        return contract.idContract
    }
    async updateById({ idContract, description, payload, originPlanet, destinationPlanet, idStatus, idPilot, value }: contractRepositoryTypes.update): Promise<number> {
        const contract = this.contracts.find( ele => ele.idContract === idContract)
        if(!contract) return 0 
        const findIndex = this.contracts.findIndex( ele => ele.idContract === idContract)

        this.contracts[findIndex] = {
            description,
            destinationPlanet,
            idContract,
            idPilot,
            idStatus,
            originPlanet,
            payload,
            updatedAt: new Date(),
            value,
            createdAt: contract.createdAt
        }

        return idContract
    }
    async selectAll(): Promise<contractRepositoryTypes.contractTypes[]> {
        return this.contracts as unknown as contractRepositoryTypes.contractTypes[]
    }
    async selectById(idContract: number): Promise<contractRepositoryTypes.contractTypes | null> {
        const findContract = this.contracts.find( ele => ele.idContract === idContract)

        if(!findContract) return null

        return findContract as unknown as contractRepositoryTypes.contractTypes
    }
    async selectByDescription(description: string): Promise<contractRepositoryTypes.contractTypes | null> {
        const findContract = this.contracts.find( ele => ele.description === description)

        if(!findContract) return null

        return findContract as unknown as contractRepositoryTypes.contractTypes  
    }
    async selectByOpenStatus(idStatus: number): Promise<contractRepositoryTypes.contractTypes[]> {
        const findContract = this.contracts.filter( ele => {
            if(ele.idStatus === idStatus) {
                ele.status = {
                    status: 'Open',
                    idStatus
                }
                return true
            }
        })

        return findContract as unknown as contractRepositoryTypes.contractTypes[]
    }
    async selectByIdPilot(idPilot: number): Promise<contractRepositoryTypes.contractTypes[]> {
        const findContract = this.contracts.filter( ele => ele.idPilot === idPilot)

        return findContract as unknown as contractRepositoryTypes.contractTypes[]    
    }
    async selectByIdPilotAndClosedStatus(idPilot: number): Promise<contractRepositoryTypes.contractTypes[]> {
        const findContract = this.contracts.filter( ele => ele.idPilot === idPilot && ele.idStatus  === CLOSED_STATUS)

        return findContract as unknown as contractRepositoryTypes.contractTypes[]
    }
    async delete(idContract: number): Promise<number> {
        const findIndex = this.contracts.findIndex( (ele) => ele.idContract === idContract)
        
        this.contracts.splice(findIndex, 1)
        this.idCount -= 1

        return idContract
    }
}