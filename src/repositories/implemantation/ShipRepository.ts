import { PrismaClient } from "@prisma/client";
import { IShipRepository } from "../interfaces";
import { shipRepositoryTypes } from "../interfaces/IShipRepository";



export class ShipRepository implements IShipRepository {
    private prismaClient: PrismaClient

    constructor() {
        this.prismaClient = new PrismaClient()
    }
    async selectByIdPilot(idPilot: number): Promise<shipRepositoryTypes.shipTypes | null> {
        const ship = await this.prismaClient.ship.findUnique({where: {idPilot},         
        select: {
            idShip: true,
            name: true,
            fuelCapacity: true,
            fuelLevel: true,
            idPilot: true,
            weightCapacity: true,
            createdAt: true,
            updatedAt: true,
            pilot: true
        }})

        return ship
    }
    async setIdPilotInShip(idPilot: number | null, idShip: number): Promise<number> {
        const updatedId = await this.prismaClient.ship.update({data: {idPilot}, where: {idShip}})

        return updatedId.idShip
    }
    async selectAllOpenShip(): Promise<shipRepositoryTypes.shipTypes[] | null> {
        const ships = await this.prismaClient.ship.findMany({where: {idPilot: null}, 
        select: {
            idShip: true,
            name: true,
            fuelCapacity: true,
            fuelLevel: true,
            idPilot: true,
            weightCapacity: true,
            createdAt: true,
            updatedAt: true,
            pilot: true
        }})

        return ships
    }

    async create({ name, fuelCapacity, fuelLevel, weightCapacity, idPilot }: shipRepositoryTypes.create): Promise<number> {
        const insertId = await this.prismaClient.ship.create({data: {name, fuelCapacity, fuelLevel, weightCapacity, idPilot}, select: {idShip: true}})

        return insertId.idShip
    }
    async update({ idShip, name, fuelCapacity, fuelLevel, idPilot, weightCapacity }: shipRepositoryTypes.update): Promise<number> {
        const updatedId = await this.prismaClient.ship.update({
            data: {
                name,
                idPilot,
                fuelCapacity, 
                fuelLevel,
                weightCapacity
            },
            where: {
                idShip
            },
            select: {
                idShip: true
            }
        })

        return updatedId.idShip
    }
    async selectAll(): Promise<shipRepositoryTypes.shipTypes[]> {
        const ships = await this.prismaClient.ship.findMany({
            select: {
                idShip: true,
                name: true,
                fuelCapacity: true,
                fuelLevel: true,
                idPilot: true,
                weightCapacity: true,
                createdAt: true,
                updatedAt: true,
                pilot: true
            }
        })

        return ships
    }
    async selectById(idShip: number): Promise<shipRepositoryTypes.shipTypes | null> {
        const ship = await this.prismaClient.ship.findUnique({where: {
            idShip
        }, 
        select: {
            idShip: true,
            name: true,
            fuelCapacity: true,
            fuelLevel: true,
            idPilot: true,
            weightCapacity: true,
            createdAt: true,
            updatedAt: true,
            pilot: true
        }})

        return ship
    }
    async selectByName(name: string): Promise<shipRepositoryTypes.shipTypes | null> {
        const ship = await this.prismaClient.ship.findUnique({where: {
            name
        }, 
        select: {
            idShip: true,
            name: true,
            fuelCapacity: true,
            fuelLevel: true,
            idPilot: true,
            weightCapacity: true,
            createdAt: true,
            updatedAt: true,
            pilot: true
        }})

        return ship
    }
    async delete(idShip: number): Promise<number> {
        const deletedId = await this.prismaClient.ship.delete({
            where: {
                idShip
            },
            select: {
                idShip: true
            }
        })

        return deletedId.idShip
    }

}