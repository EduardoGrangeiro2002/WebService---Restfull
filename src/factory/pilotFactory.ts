import { PilotController } from "../controllers";
import { PilotRepository } from "../repositories/implemantation";
import { PilotServices } from "../Services";



function makePilotFactory () {
    const pilotRepository = new PilotRepository()
    const pilotService = new PilotServices(pilotRepository)
    const pilotController = new PilotController(pilotService)

    return pilotController
}

export { makePilotFactory }