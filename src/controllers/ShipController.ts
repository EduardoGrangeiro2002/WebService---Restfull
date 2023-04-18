import { Request, Response } from "express";
import { AppError } from "../configs/errors";
import { AppMessages } from "../configs/Messages";
import { ShipService } from "../Services";



export class ShipController {
    constructor(
        private shipService: ShipService
    ) {}

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const { name, fuelCapacity, fuelLevel, idPilot, weightCapacity } = req.body

            const result = await this.shipService.create({ name, fuelCapacity, fuelLevel, idPilot, weightCapacity })
            const { message, params } = result
            return res.status(result.statusCode).json({message, params})
        } catch (e: any) {
            if(e.message && e.statusCode) return res.status(e.statusCode).json({msg: e.message})
            
            const error = new AppError(AppMessages.findMessage('ERR009'))

            return res.status(error.statusCode).json({msg: error.message})
        }
    }

    async updateById(req: Request, res: Response): Promise<Response> {
        try {
            const { idShip, name, fuelCapacity, fuelLevel, idPilot, weightCapacity } = req.body
            const result = await this.shipService.updateById({ idShip, name, fuelCapacity, fuelLevel, idPilot, weightCapacity })
            const { message, params } = result
            return res.status(result.statusCode).json({message, params})
        } catch (e: any) {
            if(e.message && e.statusCode) return res.status(e.statusCode).json({msg: e.message})
            
            const error = new AppError(AppMessages.findMessage('ERR009'))

            return res.status(error.statusCode).json({msg: error.message})
        }
    }

    async listById(req: Request, res: Response): Promise<Response> {
        try {
            const { idShip } = req.params
            const result = await this.shipService.selectById(parseInt(idShip))

            return res.json({result})
        } catch (e: any) {
            if(e.message && e.statusCode) return res.status(e.statusCode).json({msg: e.message})
            
            const error = new AppError(AppMessages.findMessage('ERR009'))

            return res.status(error.statusCode).json({msg: error.message})
        }
    }

    async list(req: Request, res: Response): Promise<Response> {
        try {
            const result = await this.shipService.selectAll()

            return res.json({result})
        } catch (e: any) {
            if(e.message && e.statusCode) return res.status(e.statusCode).json({msg: e.message})
            
            const error = new AppError(AppMessages.findMessage('ERR009'))

            return res.status(error.statusCode).json({msg: error.message})
        }
    }

    async listOpenShip(req: Request, res: Response): Promise<Response> {
        try {
            const result = await this.shipService.selectOpenShip()

            return res.json({result})
        } catch (e: any) {
            if(e.message && e.statusCode) return res.status(e.statusCode).json({msg: e.message})
            
            const error = new AppError(AppMessages.findMessage('ERR009'))

            return res.status(error.statusCode).json({msg: error.message})
        }
    }

    async deleteById(req: Request, res: Response): Promise<Response> {
        try {
            const { idShip } = req.params
            const result = await this.shipService.deleteById(parseInt(idShip))

            const { message, params } = result
            return res.status(result.statusCode).json({message, params})   
                 
        } catch (e: any) {
            if(e.message && e.statusCode) return res.status(e.statusCode).json({msg: e.message})
            
            const error = new AppError(AppMessages.findMessage('ERR009'))

            return res.status(error.statusCode).json({msg: error.message})
        }
    }
    
    async setClosedShip(req: Request, res: Response): Promise<Response> {
        try {
            const { idShip, pilotName, pilotCertification } = req.body
            const result = await this.shipService.setCloseShip({ idShip, name: pilotName, pilotCertification })
            const { message, params } = result
            return res.status(result.statusCode).json({message, params})
        } catch (e: any) {
            if(e.message && e.statusCode) return res.status(e.statusCode).json({msg: e.message})
            
            const error = new AppError(AppMessages.findMessage('ERR009'))

            return res.status(error.statusCode).json({msg: error.message})
        }
    }

    async setOpenShip(req: Request, res: Response): Promise<Response> {
        try {
            const { idShip } = req.body
            const result = await this.shipService.setOpenShip(idShip)
            const { message, params } = result
            return res.status(result.statusCode).json({message, params})
        } catch (e: any) {
            if(e.message && e.statusCode) return res.status(e.statusCode).json({msg: e.message})
            
            const error = new AppError(AppMessages.findMessage('ERR009'))

            return res.status(error.statusCode).json({msg: error.message})
        }
    }

    async fuel(req: Request, res: Response): Promise<Response> {
        try {
            const { idShip, fuelQuantity } = req.body
            const result = await this.shipService.fuel(idShip, fuelQuantity)
            const { message, params } = result
            return res.status(result.statusCode).json({message, params})
        } catch (e: any) {
            if(e.message && e.statusCode) return res.status(e.statusCode).json({msg: e.message})
            
            const error = new AppError(AppMessages.findMessage('ERR009'))

            return res.status(error.statusCode).json({msg: error.message})
        }
    }

    async travels(req: Request, res: Response): Promise<Response> {
        try {
            const { idShip, destinationPlanet } = req.body
            const result = await this.shipService.startTravel(idShip, destinationPlanet)
            const { message, params } = result
            return res.status(result.statusCode).json({message, params})
        } catch (e: any) {
            if(e.message && e.statusCode) return res.status(e.statusCode).json({msg: e.message})
            
            const error = new AppError(AppMessages.findMessage('ERR009'))

            return res.status(error.statusCode).json({msg: error.message})
        }
    }
}