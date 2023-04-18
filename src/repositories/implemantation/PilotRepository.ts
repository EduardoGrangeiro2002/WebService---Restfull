import { IPilotRepository } from "../interfaces";
import { pilotRepositoryTypes } from "../interfaces/IPilotRepository";
import { PrismaClient }  from '@prisma/client'


export class PilotRepository implements IPilotRepository {
    private pilotCliente: PrismaClient
    constructor() {
        this.pilotCliente = new PrismaClient()
    }
    async selectByPilotName(name: string): Promise<pilotRepositoryTypes.pilotTypes | null> {
        const pilot = await this.pilotCliente.pilot.findUnique({where: {
            name
        }, 
        select: 
        {
            name: true, 
            pilotCertification: true, 
            age: true, 
            credits: true, 
            idPilot: true, 
            locationPlanet: true, 
            createdAt: true, 
            updatedAt: true
        }
    })
        return pilot as unknown as pilotRepositoryTypes.pilotTypes
    }
    async create({ name, pilotCertification, age, credits, locationPlanet }: pilotRepositoryTypes.create): Promise<number> {
        const insertId = await this.pilotCliente.pilot.create({data: {name, pilotCertification, age, credits, locationPlanet}, select: {idPilot: true}})

        return insertId.idPilot
    }
    async update({ idPilot, name, pilotCertification, age, credits, locationPlanet }: pilotRepositoryTypes.update): Promise<number> {
        const updateId = await this.pilotCliente.pilot.update({data: {name, pilotCertification, locationPlanet, age, credits, updatedAt: new Date()}, where: {idPilot}, select: {idPilot: true}})

        return updateId.idPilot
    }
    async selectAll(): Promise<pilotRepositoryTypes.pilotTypes[]> {
        const pilots = await this.pilotCliente.pilot.findMany({select: 
            {
            idPilot: true, 
            name: true, 
            age: true, 
            credits: true, 
            locationPlanet: true, 
            pilotCertification: true, 
            createdAt: true, 
            updatedAt: true
            }
        })

        return pilots as unknown as pilotRepositoryTypes.pilotTypes[]
    }
    async selectByPilotCertificaiton(pilotCertification: string): Promise<pilotRepositoryTypes.pilotTypes | null> {
        const pilot = await this.pilotCliente.pilot.findUnique({where: {
            pilotCertification
        }, 
        select: 
        {
            name: true, 
            pilotCertification: true, 
            age: true, 
            credits: true, 
            idPilot: true, 
            locationPlanet: true, 
            createdAt: true, 
            updatedAt: true
        }
    })
        return pilot as unknown as pilotRepositoryTypes.pilotTypes
    }
    async selectById(idPilot: number): Promise<pilotRepositoryTypes.pilotTypes | null> {
        const pilot = await this.pilotCliente.pilot.findUnique({where: {
            idPilot
        }, 
        select: 
        {
            name: true, 
            pilotCertification: true, 
            age: true, 
            credits: true, 
            idPilot: true, 
            locationPlanet: true, 
            createdAt: true, 
            updatedAt: true
        }
    })
        return pilot as unknown as pilotRepositoryTypes.pilotTypes
    }
    async delete(idPilot: number): Promise<number> {
        const deletedId = await this.pilotCliente.pilot.delete({where: {idPilot}, select: {idPilot: true}})

        return deletedId.idPilot
    }
    
}