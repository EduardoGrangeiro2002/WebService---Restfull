import { ContractRepositoryInMemory, PilotRepositoryInMemory, ResourceRepositoryInMemory, ShipRepositoryInMemory, TransactionRepositoryInMemory } from "../../../repositories/InMemory"
import { IContractRepository, IPilotRepository, IResourceRepository, IShipRepository, ITransactionRepository } from "../../../repositories/interfaces"
import { ContractServices, PilotServices, ReportsServices, ShipService } from "../../../Services"
import { ResourceServices } from "../../../Services/ResourceServices"

let contractRepository: IContractRepository
let shipRepository: IShipRepository
let transactionRepository: ITransactionRepository
let pilotRepository: IPilotRepository
let resourceRepository: IResourceRepository
let reportServices: ReportsServices
let shipServices: ShipService
let pilotServices: PilotServices
let contractServices: ContractServices
let resourceServices: ResourceServices
const FUEL = 20
describe('Tests Reports', () => {
    beforeEach(async () => {
        contractRepository = new ContractRepositoryInMemory()
        shipRepository = new ShipRepositoryInMemory()
        transactionRepository = new TransactionRepositoryInMemory()
        pilotRepository = new PilotRepositoryInMemory()
        resourceRepository = new ResourceRepositoryInMemory(contractRepository)
        shipServices = new ShipService(pilotRepository, shipRepository, transactionRepository)
        pilotServices = new PilotServices(pilotRepository)
        contractServices = new ContractServices(contractRepository, pilotRepository, shipRepository, transactionRepository)
        reportServices = new ReportsServices(contractRepository, resourceRepository, transactionRepository, pilotRepository)
        resourceServices = new ResourceServices(resourceRepository, contractRepository)

        const pilotResponse = await pilotServices.create({
            name: 'Eduardo',
            age: 20,
            credits: 1200,
            locationPlanet: 'Calas',
            pilotCertification: '123ABC'
        })

        const shipResponse = await shipServices.create({
            name: 'Setup Ship',
            fuelCapacity: 100,
            fuelLevel: 45,
            idPilot: pilotResponse.params.id,
            weightCapacity: 100
        })

        const contractResponse = await contractServices.create({
            description: 'Setup',
            destinationPlanet: 'Aqua',
            idPilot: null,
            originPlanet: 'Calas',
            value: 1000
        })

        await resourceServices.create({
            idContract: contractResponse.params.id,
            name: 'water',
            weight: 10
        })

        await resourceServices.create({
            idContract: contractResponse.params.id,
            name: 'food',
            weight: 10
        })

        await resourceServices.create({
            idContract: contractResponse.params.id,
            name: 'minerals',
            weight: 20
        })

        await resourceServices.create({
            idContract: contractResponse.params.id,
            name: 'food',
            weight: 10
        })


        await contractServices.acceptContracts(pilotResponse.params.id, contractResponse.params.id)

        await shipServices.startTravel(shipResponse.params.id, 'Aqua')

        await contractServices.deliverContracts(pilotResponse.params.id, contractResponse.params.id)

        shipServices.fuel(shipResponse.params.id, FUEL)
        shipServices.fuel(shipResponse.params.id, FUEL)
        shipServices.fuel(shipResponse.params.id, FUEL)
    })
    test('Tests transactions reports', async () => {
        const responseService = await reportServices.transactionsDesc()

        expect(responseService).toHaveLength(4)
    })

    test('Test percentage reports by pilot', async () => {
        const responseService = await reportServices.percentageResourcesByPilot()
        
        expect(responseService).toHaveProperty('Eduardo')
        expect(responseService.Eduardo).toHaveProperty('food')
        expect(responseService.Eduardo).toHaveProperty('water')
        expect(responseService.Eduardo).toHaveProperty('minerals')
        expect(responseService.Eduardo.food).toBe(40)
        expect(responseService.Eduardo.water).toBe(20)
        expect(responseService.Eduardo.minerals).toBe(40)
    })

    test('Test resources weight total by planets', async () => {
        const responseService = await reportServices.weightSuppliesPlanetReport()

        expect(responseService.Aqua.received.food).toBe(20)
        expect(responseService.Aqua.received.water).toBe(10)
        expect(responseService.Aqua.received.minerals).toBe(20)
        expect(responseService.Calas.sent.food).toBe(20)
        expect(responseService.Calas.sent.water).toBe(10)
        expect(responseService.Calas.sent.minerals).toBe(20)
    })
})

