import { Request, Response } from "express";
import { AppError } from "../configs/errors";
import { AppMessages } from "../configs/Messages";
import { PilotServices } from "../Services";



export class PilotController {
    constructor(
        private pilotService: PilotServices
    ) {}

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const { name, pilotCertification, age, credits, locationPlanet } = req.body

            const result = await this.pilotService.create({ name, pilotCertification, age, credits, locationPlanet })
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
            const { idPilot, name, pilotCertification, age, credits, locationPlanet } = req.body
            const result = await this.pilotService.updateById({idPilot, name, pilotCertification, age, credits, locationPlanet})
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
            const { idPilot } = req.params
            const result = await this.pilotService.selectById(parseInt(idPilot))

            return res.json({result})
        } catch (e: any) {
            if(e.message && e.statusCode) return res.status(e.statusCode).json({msg: e.message})
            
            const error = new AppError(AppMessages.findMessage('ERR009'))

            return res.status(error.statusCode).json({msg: error.message})
        }
    }

    async list(req: Request, res: Response): Promise<Response> {
        try {
            const result = await this.pilotService.selectAll()

            return res.json({result})
        } catch (e: any) {
            if(e.message && e.statusCode) return res.status(e.statusCode).json({msg: e.message})
            
            const error = new AppError(AppMessages.findMessage('ERR009'))

            return res.status(error.statusCode).json({msg: error.message})
        }
    }

    async deleteById(req: Request, res: Response): Promise<Response> {
        try {
            const { idPilot } = req.params
            const result = await this.pilotService.deleteById(parseInt(idPilot))

            const { message, params } = result
            return res.status(result.statusCode).json({message, params})   
                 
        } catch (e: any) {
            if(e.message && e.statusCode) return res.status(e.statusCode).json({msg: e.message})
            
            const error = new AppError(AppMessages.findMessage('ERR009'))

            return res.status(error.statusCode).json({msg: error.message})
        }
    }
}