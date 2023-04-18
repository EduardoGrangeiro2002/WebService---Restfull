import { ContractController } from "../controllers";
import { ContractRepository, PilotRepository, ShipRepository, TransactionRepository } from "../repositories/implemantation";
import { ContractServices } from "../Services";



export function makeContractFactory () {
    const pilotRepository = new PilotRepository()
    const contractRepository = new ContractRepository()
    const transactionRepository = new TransactionRepository()
    const shipRepository = new ShipRepository()
    const contractServices = new ContractServices(contractRepository, pilotRepository, shipRepository, transactionRepository)
    const contractController = new ContractController(contractServices)

    return contractController
}