import { Pilot } from "../../../entities"
import { pilotAttributes } from "./types"


let pilot: pilotAttributes
let pilotClassIntance: Pilot
describe('Test Pilot class', () => {
    beforeEach( () => {
        pilot = {
            name: 'Pilot Test',
            pilotCertification: '1234567',
            age: 25,
            credits: 25.50,
            locationPlanet: 'Deméter'
        }
    })

    test('Should to create a new Pilot class', () => {
        const pilotClass = new Pilot(
            pilot.name, 
            pilot.pilotCertification, 
            pilot.age, pilot.credits, 
            pilot.locationPlanet
            )
            checkIfClassHaveSettersAndGetters(pilotClass)        
    })

    describe('Test method in Pilot class', () => {

        test('Method -> setName: should be able to set the Name the pilot', () => {
            pilotClassIntance = getNewClassPilot(pilot)
            const name = 'Pilot Test setName'
            pilotClassIntance.setName(name)

            expect(pilotClassIntance.getName()).toBe(name)
        })

        test('Method -> getName: should be able to get the Name the pilot', () => {
            pilotClassIntance = getNewClassPilot(pilot)

            expect(pilotClassIntance.getName()).toBe(pilot.name)
        })

        test('Method -> setPilotCertification: should be able to set the Pilot certification', () => {
            pilotClassIntance = getNewClassPilot(pilot)
            const pilotCertification = '098765'
            pilotClassIntance.setPilotCertification(pilotCertification)

            expect(pilotClassIntance.getPilotCertification()).toBe(pilotCertification)
        })

        test('Method -> getPilotCertification: should be able to get the Pilot certification', () => {
            pilotClassIntance = getNewClassPilot(pilot)

            expect(pilotClassIntance.getPilotCertification()).toBe(pilot.pilotCertification)
        })

        test('Method -> setAge: should be able to set the age the pilot', () => {
            pilotClassIntance = getNewClassPilot(pilot)
            const age = 35
            pilotClassIntance.setAge(age)

            expect(pilotClassIntance.getAge()).toBe(age)
        })

        test('Method -> getAge: should be able to get the age the pilot', () => {
            pilotClassIntance = getNewClassPilot(pilot)

            expect(pilotClassIntance.getAge()).toBe(pilot.age)
        })

        test('Method -> setCredits: should be able to set the credits the pilot', () => {
            pilotClassIntance = getNewClassPilot(pilot)
            const credits = 550.00
            pilotClassIntance.setCredits(credits)

            expect(pilotClassIntance.getCredits()).toBe(credits)
        })

        test('Method -> getCredits: should be able to get the credits the pilot', () => {
            pilotClassIntance = getNewClassPilot(pilot)

            expect(pilotClassIntance.getCredits()).toBe(pilot.credits)
        })

        test('Method -> setLocationPlanet: should be able to set the location planet the pilot', () => {
            pilotClassIntance = getNewClassPilot(pilot)
            const locationPlanet = 'Calas'
            pilotClassIntance.setLocationPlanet(locationPlanet)

            expect(pilotClassIntance.getLocationPlanet()).toBe(locationPlanet)
        })

        test('Method -> getLocationPlanet: should be able to get the location planet the pilot', () => {
            pilotClassIntance = getNewClassPilot(pilot)

            expect(pilotClassIntance.getLocationPlanet()).toBe(pilot.locationPlanet)
        })

        test('Method -> checkIfAgeIsOverYearsOld: Should be able to check age is more than 18 years', () => {
            pilotClassIntance = getNewClassPilot(pilot)
            pilotClassIntance.setAge(19)

            expect(pilotClassIntance.checkIfAgeIsOverYearsOld()).toBe(true)
            pilotClassIntance.setAge(18)
            expect(pilotClassIntance.checkIfAgeIsOverYearsOld()).toBe(true)
            pilotClassIntance.setAge(17)
            expect(pilotClassIntance.checkIfAgeIsOverYearsOld()).toBe(false)
        })
    })
})

function getNewClassPilot ({name, pilotCertification, age, credits, locationPlanet}: pilotAttributes) {
    const pilotClass = new Pilot(name, pilotCertification, age, credits, locationPlanet)

    return pilotClass
}

function checkIfClassHaveSettersAndGetters(pilotClass: Pilot) {
    expect(pilotClass).toHaveProperty("name")
    expect(pilotClass).toHaveProperty("pilotCertification")
    expect(pilotClass).toHaveProperty("age")
    expect(pilotClass).toHaveProperty("credits")
    expect(pilotClass).toHaveProperty("locationPlanet")
    expect(pilotClass).toHaveProperty("setName")
    expect(pilotClass).toHaveProperty("getName")
    expect(pilotClass).toHaveProperty("setPilotCertification")
    expect(pilotClass).toHaveProperty("getPilotCertification")
    expect(pilotClass).toHaveProperty("setAge")
    expect(pilotClass).toHaveProperty("getAge")
    expect(pilotClass).toHaveProperty("setCredits")
    expect(pilotClass).toHaveProperty("getCredits")
    expect(pilotClass).toHaveProperty("setLocationPlanet")
    expect(pilotClass).toHaveProperty("getLocationPlanet")
    expect(pilotClass).toHaveProperty("checkIfAgeIsOverYearsOld")
    expect(pilotClass).toHaveProperty("checkPilotCertification")
    expect(pilotClass).toHaveProperty("getPilotDTO")
}
