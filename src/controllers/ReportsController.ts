import { Request, Response } from "express";
import { AppError } from "../configs/errors";
import { AppMessages } from "../configs/Messages";
import { ReportsServices } from "../Services";

export class ReportsController {
    constructor(
        private reportsServices: ReportsServices 
        ) {}
    async transaction(req: Request, res: Response): Promise<Response> {
        try {
            const result = await this.reportsServices.transactionsDesc()

            return res.json(result)
        } catch (e: any) {
            if(e.message && e.statusCode) return res.status(e.statusCode).json({msg: e.message})
            
            const error = new AppError(AppMessages.findMessage('ERR009'))

            return res.status(error.statusCode).json({msg: error.message})
        }
    }

    async weightSuppliesPlanetReport(req: Request, res: Response): Promise<Response> {
        try {
            const result = await this.reportsServices.weightSuppliesPlanetReport()

            return res.json(result)
        } catch (e: any) {
            if(e.message && e.statusCode) return res.status(e.statusCode).json({msg: e.message})
            
            const error = new AppError(AppMessages.findMessage('ERR009'))

            return res.status(error.statusCode).json({msg: error.message})
        }
    }

    async percentageResourcesByPilot(req: Request, res: Response): Promise<Response> {
        try {
            const result = await this.reportsServices.percentageResourcesByPilot()

            return res.json(result)
        } catch (e: any) {
            if(e.message && e.statusCode) return res.status(e.statusCode).json({msg: e.message})
            
            const error = new AppError(AppMessages.findMessage('ERR009'))

            return res.status(error.statusCode).json({msg: error.message})
        }
    }
}