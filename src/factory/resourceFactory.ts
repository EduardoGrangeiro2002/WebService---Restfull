import { ResourceController } from "../controllers";
import { ContractRepository, ResourceRepository } from "../repositories/implemantation";
import { ResourceServices } from "../Services/ResourceServices";



export function makeResourceFactory () {
    const contractRepository = new ContractRepository()
    const resourceRepository = new ResourceRepository()
    const resourceService = new ResourceServices(resourceRepository, contractRepository)
    const resourceController = new ResourceController(resourceService)

    return resourceController
}