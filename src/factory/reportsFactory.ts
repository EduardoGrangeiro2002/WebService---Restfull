import { ReportsController } from "../controllers";
import { ContractRepository, PilotRepository, ResourceRepository, ShipRepository, TransactionRepository } from "../repositories/implemantation";
import { ReportsServices } from "../Services";



export function makeReportFactory () {
   const transactionRepository = new TransactionRepository()
   const contractRepository = new ContractRepository()
   const pilotRepository = new PilotRepository()
   const resourceRepository = new ResourceRepository()
   const reportsServices = new ReportsServices(contractRepository, resourceRepository, transactionRepository, pilotRepository)
   const reportsController = new ReportsController(reportsServices)

    return reportsController
}