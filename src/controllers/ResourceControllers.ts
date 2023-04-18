import { Request, Response } from "express";
import { AppError } from "../configs/errors";
import { AppMessages } from "../configs/Messages";
import { ResourceServices } from "../Services/ResourceServices";

export class ResourceController {
    constructor(
        private resourceService: ResourceServices 
        ) {}

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const { idContract, name, weight } = req.body

            const result = await this.resourceService.create({ idContract, name, weight })
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
            const { idContract, name, weight, idResource } = req.body
            const result = await this.resourceService.updateById({ idContract, name, weight, idResource })
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
            const { idResource } = req.params
            const result = await this.resourceService.selectById(parseInt(idResource))

            return res.json({result})
        } catch (e: any) {
            if(e.message && e.statusCode) return res.status(e.statusCode).json({msg: e.message})
            
            const error = new AppError(AppMessages.findMessage('ERR009'))

            return res.status(error.statusCode).json({msg: error.message})
        }
    }

    async list(req: Request, res: Response): Promise<Response> {
        try {
            const result = await this.resourceService.selectAll()

            return res.json({result})
        } catch (e: any) {
            if(e.message && e.statusCode) return res.status(e.statusCode).json({msg: e.message})
            
            const error = new AppError(AppMessages.findMessage('ERR009'))

            return res.status(error.statusCode).json({msg: error.message})
        }
    }

    async deleteById(req: Request, res: Response): Promise<Response> {
        try {
            const { idResource } = req.params
            const result = await this.resourceService.deleteById(parseInt(idResource))

            const { message, params } = result
            return res.status(result.statusCode).json({message, params})   
                 
        } catch (e: any) {
            if(e.message && e.statusCode) return res.status(e.statusCode).json({msg: e.message})
            
            const error = new AppError(AppMessages.findMessage('ERR009'))

            return res.status(error.statusCode).json({msg: error.message})
        }
    }
}