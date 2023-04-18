import { ShipController } from "../controllers";
import { PilotRepository, ShipRepository, TransactionRepository } from "../repositories/implemantation";
import { ShipService } from "../Services";



function makeShipFactory () {
    const shipRepository = new ShipRepository()
    const pilotRepository = new PilotRepository()
    const transactionRepository = new TransactionRepository()
    const shipService = new ShipService(pilotRepository, shipRepository, transactionRepository)
    const shipController = new ShipController(shipService)

    return shipController
}

export { makeShipFactory }