import { Request, Response } from "express";
import { AppError } from "../configs/errors";
import { AppMessages } from "../configs/Messages";
import { ContractServices } from "../Services";



export class ContractController {
    constructor(
        private contractServices: ContractServices
        ) {}

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const { description, destinationPlanet, idPilot, originPlanet, value } = req.body

            const result = await this.contractServices.create({ description, destinationPlanet, idPilot, originPlanet, value })
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
            const { description, destinationPlanet, idContract, idPilot, originPlanet, value } = req.body
            const result = await this.contractServices.updateById({ description, destinationPlanet, idContract, idPilot, originPlanet, value })
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
            const { idContract } = req.params
            const result = await this.contractServices.selectById(parseInt(idContract))

            return res.json({result})
        } catch (e: any) {
            if(e.message && e.statusCode) return res.status(e.statusCode).json({msg: e.message})
            
            const error = new AppError(AppMessages.findMessage('ERR009'))

            return res.status(error.statusCode).json({msg: error.message})
        }
    }

    async list(req: Request, res: Response): Promise<Response> {
        try {
            const result = await this.contractServices.selectAll()

            return res.json({result})
        } catch (e: any) {
            if(e.message && e.statusCode) return res.status(e.statusCode).json({msg: e.message})
            
            const error = new AppError(AppMessages.findMessage('ERR009'))

            return res.status(error.statusCode).json({msg: error.message})
        }
    }

    async listOpenContract(req: Request, res: Response): Promise<Response> {
        try {
            const result = await this.contractServices.selectAllOpenContract()

            return res.json({result})
        } catch (e: any) {
            if(e.message && e.statusCode) return res.status(e.statusCode).json({msg: e.message})
            
            const error = new AppError(AppMessages.findMessage('ERR009'))

            return res.status(error.statusCode).json({msg: error.message})
        }
    }

    async deleteById(req: Request, res: Response): Promise<Response> {
        try {
            const { idContract } = req.params
            const result = await this.contractServices.deleteById(parseInt(idContract))

            const { message, params } = result
            return res.status(result.statusCode).json({message, params})   
                 
        } catch (e: any) {
            if(e.message && e.statusCode) return res.status(e.statusCode).json({msg: e.message})
            
            const error = new AppError(AppMessages.findMessage('ERR009'))

            return res.status(error.statusCode).json({msg: error.message})
        }
    }

    async acceptContract(req: Request, res: Response): Promise<Response> {
        try {
            const { idContract, idPilot } = req.params
            const result = await this.contractServices.acceptContracts(parseInt(idPilot), parseInt(idContract))

            const { message, params } = result
            return res.status(result.statusCode).json({message, params})   
                 
        } catch (e: any) {
            console.error(e)
            if(e.message && e.statusCode) return res.status(e.statusCode).json({msg: e.message})
            
            const error = new AppError(AppMessages.findMessage('ERR009'))

            return res.status(error.statusCode).json({msg: error.message})
        }
    }

    async deliverContracts(req: Request, res: Response): Promise<Response> {
        try {
            const { idContract, idPilot } = req.params
            const result = await this.contractServices.deliverContracts(parseInt(idPilot), parseInt(idContract))

            const { message, params } = result
            return res.status(result.statusCode).json({message, params})   
                 
        } catch (e: any) {
            console.error(e)
            if(e.message && e.statusCode) return res.status(e.statusCode).json({msg: e.message})
            
            const error = new AppError(AppMessages.findMessage('ERR009'))

            return res.status(error.statusCode).json({msg: error.message})
        }
    }
}