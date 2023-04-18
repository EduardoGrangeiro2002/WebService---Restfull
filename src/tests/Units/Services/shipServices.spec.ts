import { PilotRepositoryInMemory, ShipRepositoryInMemory, TransactionRepositoryInMemory } from "../../../repositories/InMemory";
import { IPilotRepository, IShipRepository, ITransactionRepository } from "../../../repositories/interfaces";
import { PilotServices, ShipService } from "../../../Services";



let shipRepository: IShipRepository
let pilotRepository: IPilotRepository
let transactionRepository: ITransactionRepository
let shipServices: ShipService
let pilotServices: PilotServices
let idShipSetup: number = 1
let idPilotSetup: number = 1
describe('ShipServices', () => {
    beforeEach( async ()=> {
        shipRepository = new ShipRepositoryInMemory()
        pilotRepository = new PilotRepositoryInMemory()
        transactionRepository = new TransactionRepositoryInMemory()
        shipServices = new ShipService(pilotRepository, shipRepository, transactionRepository)
        pilotServices = new PilotServices(pilotRepository)
        const pilotResponse = await pilotServices.create({
            name: 'Eduardo',
            age: 20,
            credits: 1200,
            locationPlanet: 'Demeter',
            pilotCertification: '123ABC'
        })
        idPilotSetup = pilotResponse.params.id

        const shipResponse = await shipServices.create({
            name: 'Setup Ship',
            fuelCapacity: 100,
            fuelLevel: 45,
            idPilot: idPilotSetup,
            weightCapacity: 100
        })

        idShipSetup = shipResponse.params.id
    })

    test('Create a new Ship', async () => {
        const name = 'Millenniun Falcon'
        const fuelCapacity = 100
        const fuelLevel = 50
        const idPilot = null
        const weightCapacity = 100
        
        const responseServices = await shipServices.create({name, fuelCapacity, fuelLevel, idPilot, weightCapacity})

        expect(responseServices.statusCode).toBe(201)
        expect(responseServices.params).toHaveProperty('id')
    })

    test('Register a new fuel supply', async () => {
        const value = 20
        const responseService = await shipServices.fuel(idShipSetup, value)
        const transaction = await transactionRepository.selectAll()
        const pilot = await pilotRepository.selectById(idPilotSetup)
        expect(transaction[0].description).toBe(`${pilot?.name} bought fuel`)
        expect(transaction[0].value).toBe(value * 7)
        expect(pilot?.credits).toBe(1200 - value * 7)
    })

    test('Realize a new Travel', async () => {
        const value = 30
        const destinationPlanet = 'Aqua'
        const originPlanet = 'Demeter'
        await shipServices.fuel(idShipSetup, value)
        const pilotBeforeTravel = await pilotRepository.selectById(idPilotSetup)
        const responseService = await shipServices.startTravel(idShipSetup, destinationPlanet)
        const pilotAfterTravel = await pilotRepository.selectById(idPilotSetup)
        expect(responseService.statusCode).toBe(200)
        expect(pilotAfterTravel?.locationPlanet).toBe(destinationPlanet)
        expect(pilotBeforeTravel?.locationPlanet).toBe(originPlanet)
    })
})