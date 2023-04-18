import { ContractRepositoryInMemory, PilotRepositoryInMemory, ShipRepositoryInMemory, TransactionRepositoryInMemory } from "../../../repositories/InMemory"
import { IContractRepository, IPilotRepository, IShipRepository, ITransactionRepository } from "../../../repositories/interfaces"
import { ContractServices, PilotServices, ShipService } from "../../../Services"

let contractRepository: IContractRepository
let shipRepository: IShipRepository
let transactionRepository: ITransactionRepository
let pilotRepository: IPilotRepository
let contractServices: ContractServices
let shipServices: ShipService
let pilotServices: PilotServices
let idPilotSetup: number = 1
let idShipSetup: number = 1
let idContractSetup: number = 1
describe('ContractServices', () => {
    beforeEach( async () => {
        contractRepository = new ContractRepositoryInMemory()
        shipRepository = new ShipRepositoryInMemory()
        transactionRepository = new TransactionRepositoryInMemory()
        pilotRepository = new PilotRepositoryInMemory()
        pilotServices = new PilotServices(pilotRepository)
        shipServices = new ShipService(pilotRepository, shipRepository, transactionRepository)
        contractServices = new ContractServices(contractRepository, pilotRepository, shipRepository,transactionRepository)

        const pilotResponse = await pilotServices.create({
            name: 'Eduardo',
            age: 20,
            credits: 1200,
            locationPlanet: 'Demeter',
            pilotCertification: '123ABC'
        })

        idPilotSetup = pilotResponse.params.id
        const shipResponse = await shipServices.create({
            name: 'Millennium Falcon',
            fuelCapacity: 100,
            fuelLevel: 45,
            idPilot: idPilotSetup,
            weightCapacity: 100
        })

        const contractReponse = await contractServices.create({
            description: 'Setup',
            destinationPlanet: 'Demeter',
            idPilot: null,
            originPlanet: 'Demeter',
            value: 1000
        })

        idContractSetup = contractReponse.params.id

        idShipSetup = shipResponse.params.id
    })

    test('Create a new contract', async () => {
        const description = 'Contract 1'
        const destinationPlanet = 'Demeter'
        const idPilot = null
        const originPlanet = 'Aqua'
        const value = 1295

        const responseService = await contractServices.create({
            description,
            destinationPlanet,
            idPilot,
            originPlanet,
            value
        })

        expect(responseService.statusCode).toBe(201)
        expect(responseService.params).toHaveProperty('id')
    })

    test('List open contracts', async () => {
        let description = 'Contract 1'
        let destinationPlanet = 'Demeter'
        let idPilot = null
        let originPlanet = 'Aqua'
        let value = 1295

        await contractServices.create({
            description,
            destinationPlanet,
            idPilot,
            originPlanet,
            value
        })

        description = 'Contract 2'
        destinationPlanet = 'Andvari'
        idPilot = null
        originPlanet = 'Calas'
        value = 1400

        await contractServices.create({
            description,
            destinationPlanet,
            idPilot,
            originPlanet,
            value
        })

        const responseService = await contractServices.selectAllOpenContract()

        responseService.forEach( (res) => {
            expect(res.idStatus).toBe(1)
        })
        
    })

    test('Accept contracts', async () => {
        let description = 'Contract 1'
        let destinationPlanet = 'Aqua'
        let idPilot = null
        let originPlanet = 'Demeter'
        let value = 1295

        const contractReponse = await contractServices.create({
            description,
            destinationPlanet,
            idPilot,
            originPlanet,
            value
        })

        const responseService = await contractServices.acceptContracts(idPilotSetup, contractReponse.params.id)
        const contract = await contractRepository.selectById(contractReponse.params.id)
        expect(contract?.idStatus).toBe(2)
        expect(responseService.statusCode).toBe(200)
        expect(responseService.params).toHaveProperty('id')
    })

    test("Deliver contract", async () => {
        await contractServices.acceptContracts(idPilotSetup, idContractSetup)

        const responseService = await contractServices.deliverContracts(idPilotSetup, idContractSetup)
        const pilot = await pilotRepository.selectById(idPilotSetup)
        const contract = await contractRepository.selectById(idContractSetup)
        expect(contract?.idStatus).toBe(3)
        expect(pilot?.credits).toBe(2200)
        expect(responseService.statusCode).toBe(200)
    })
})