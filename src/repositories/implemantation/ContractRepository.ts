import { PrismaClient } from "@prisma/client";
import { IContractRepository } from "../interfaces";
import { contractRepositoryTypes } from "../interfaces/IContractRepository";

const CLOSED_STATUS = 3


export class ContractRepository implements IContractRepository {
    private prismaClient: PrismaClient
    constructor() {
        this.prismaClient = new PrismaClient()
    }
    async selectByIdPilotAndClosedStatus(idPilot: number): Promise<contractRepositoryTypes.contractTypes[]> {
        const contract = await this.prismaClient.contract.findMany({where: {idPilot, AND: {idStatus: CLOSED_STATUS}}})

        return contract as unknown as contractRepositoryTypes.contractTypes[]
    }
    async selectByIdPilot(idPilot: number): Promise<contractRepositoryTypes.contractTypes[]> {
        const contract = await this.prismaClient.contract.findMany({where: {idPilot}})

        return contract as unknown as contractRepositoryTypes.contractTypes[]
    }
    async delete(idContract: number): Promise<number> {
        const deletedId = await this.prismaClient.contract.delete({where: {idContract}, select: {idContract: true}})

        return deletedId.idContract
    }
    async create({ description, payload, originPlanet, destinationPlanet, idStatus, idPilot, value }: contractRepositoryTypes.create): Promise<number> {
        const insertId = await this.prismaClient.contract.create({data: {
            description,
            payload,
            originPlanet,
            destinationPlanet,
            idStatus,
            idPilot,
            value
        }, select: {idContract: true}})

        return insertId.idContract
    }
    async updateById({ idContract, description, payload, originPlanet, destinationPlanet, idStatus, idPilot, value }: contractRepositoryTypes.update): Promise<number> {
        const updatedId = await this.prismaClient.contract.update({where: {idContract}, data: {
            description,
            payload,
            originPlanet,
            destinationPlanet,
            idStatus,
            idPilot,
            value
        }, select: {
            idContract: true
        }})

        return updatedId.idContract
    }
    async selectAll(): Promise<contractRepositoryTypes.contractTypes[]> {
        const contracts = await this.prismaClient.contract.findMany({select: {
            description: true,
            originPlanet: true,
            destinationPlanet: true,
            payload: true,
            idPilot: true,
            idStatus: true,
            status: true,
            pilot: true,
            value: true,
            createdAt: true,
            updatedAt: true,
            idContract: true
        }})

        return contracts as unknown as contractRepositoryTypes.contractTypes[]
    }
    async selectById(idContract: number): Promise<contractRepositoryTypes.contractTypes | null> {
        const contract = this.prismaClient.contract.findUnique({where: {idContract}, select: {
            description: true,
            originPlanet: true,
            destinationPlanet: true,
            payload: true,
            idPilot: true,
            idStatus: true,
            status: true,
            pilot: true,
            value: true,
            createdAt: true,
            updatedAt: true,
            idContract: true
        }})

        return contract as unknown as contractRepositoryTypes.contractTypes
    }
    async selectByDescription(description: string): Promise<contractRepositoryTypes.contractTypes | null> {
        const contract = this.prismaClient.contract.findFirst({where: {description}, select: {
            description: true,
            originPlanet: true,
            destinationPlanet: true,
            payload: true,
            idPilot: true,
            idStatus: true,
            status: true,
            pilot: true,
            value: true,
            createdAt: true,
            updatedAt: true,
            idContract: true
        }})

        return contract as unknown as contractRepositoryTypes.contractTypes    
    }
    async selectByOpenStatus(idStatus: number): Promise<contractRepositoryTypes.contractTypes[]> {
        const contract = this.prismaClient.contract.findMany({where: {idStatus}, select: {
            description: true,
            originPlanet: true,
            destinationPlanet: true,
            payload: true,
            idPilot: true,
            idStatus: true,
            status: {select:{status: true}},
            pilot: {select: {name: true}},
            value: true,
            createdAt: true,
            updatedAt: true,
            idContract: true
        }})

        return contract as unknown as contractRepositoryTypes.contractTypes[]
    }
}