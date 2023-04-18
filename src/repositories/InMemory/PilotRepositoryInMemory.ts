import { Decimal } from "@prisma/client/runtime";
import { pilot } from "../../entities/Pilot";
import { IPilotRepository } from "../interfaces";
import { pilotRepositoryTypes } from "../interfaces/IPilotRepository";



export class PilotRepositoryInMemory implements IPilotRepository {

    private pilots: pilot[] = []
    private idCount: number = 1

    async create({ name, pilotCertification, age, credits, locationPlanet }: pilotRepositoryTypes.create): Promise<number> {
        const pilot: pilot = {
            idPilot: this.idCount,
            name,
            age,
            pilotCertification,
            locationPlanet,
            credits,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        this.pilots.push(pilot)
        this.idCount += 1
        return pilot.idPilot
    }
    async update({ idPilot, name, pilotCertification, age, credits, locationPlanet }: pilotRepositoryTypes.update): Promise<number> {
        const pilot = this.pilots.find( ele => ele.idPilot === idPilot)
        const findIndex = this.pilots.findIndex( ele => ele.idPilot === idPilot)
        
        if(!pilot) return 0

        this.pilots[findIndex] = {
            age,
            createdAt: pilot.createdAt,
            credits,
            idPilot,
            locationPlanet,
            name,
            pilotCertification,
            updatedAt: new Date()
        }

        return idPilot
    }
    async selectAll(): Promise<pilotRepositoryTypes.pilotTypes[]> {
        return this.pilots as unknown as pilotRepositoryTypes.pilotTypes[]
    }
    async selectByPilotCertificaiton(pilotCertification: string): Promise<pilotRepositoryTypes.pilotTypes | null> {
        const findPilot = this.pilots.find( (ele) => ele.pilotCertification === pilotCertification)

        if(!findPilot) return null

        return findPilot as unknown as pilotRepositoryTypes.pilotTypes
    }
    async selectByPilotName(name: string): Promise<pilotRepositoryTypes.pilotTypes | null> {
        const findPilot = this.pilots.find( (ele) => ele.name === name)

        if(!findPilot) return null

        return findPilot as unknown as pilotRepositoryTypes.pilotTypes
    }
    async selectById(idPilot: number): Promise<pilotRepositoryTypes.pilotTypes | null> {
        const findPilot = this.pilots.find( (ele) => ele.idPilot === idPilot)

        if(!findPilot) return null

        return findPilot as unknown as pilotRepositoryTypes.pilotTypes
    }
    async delete(idPilot: number): Promise<number> {
        const findIndex = this.pilots.findIndex( ele => ele.idPilot === idPilot)
        this.pilots.splice(findIndex, 1)
        this.idCount -= 1

        return idPilot
    }

}