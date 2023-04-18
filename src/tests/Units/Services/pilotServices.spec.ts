import { Pilot } from "../../../entities"
import { PilotRepositoryInMemory } from "../../../repositories/InMemory"
import { IPilotRepository } from "../../../repositories/interfaces"
import { PilotServices } from "../../../Services"

/*
    Create a new Pilot
*/

let pilotRepositoryInMemory: IPilotRepository
let pilotService: PilotServices

describe('PilotServices', () => {
    beforeEach( () => {
        pilotRepositoryInMemory = new PilotRepositoryInMemory()
        pilotService = new PilotServices(pilotRepositoryInMemory)
    })

    test('Create a new pilot', async () => {
        const name = 'Eduardo'
        const pilotCertification = '123ABC'
        const age = 20
        const credits = 200
        const locationPlanet = 'Demeter'
        
        const pilot = new Pilot(name, pilotCertification, age, credits, locationPlanet)
        const responseService = await pilotService.create({
            name: pilot.getName(),
            age: pilot.getAge(),
            credits: pilot.getCredits(),
            locationPlanet: pilot.getLocationPlanet(),
            pilotCertification: pilot.getPilotCertification()
        })
        expect(responseService.statusCode).toBe(201)
        expect(responseService.params).toHaveProperty('id')
    })
})