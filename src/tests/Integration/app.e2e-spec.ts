import request from 'supertest'
import { Server } from '../../server'
import { Express } from 'express'


/*
Test Integration 

  - Create a new Pilot
  - Create a new ship with the pilot id to set the ship to the pilot
  - With the new ship, realize recharge fuel
  - List opened contracts for accept
  - Travel the contract's home planet
  - Accept contract
  - Travel to contract's destination planet
  - Deliver contract

*/


let app: Express
describe('[e2e] Test API workflow', () => {
    let idPilot: number;
    let idShip: number
    let idContract: number
    beforeEach( async () => {
        app = Server.startTestE2E()
        const responsePilot = await request(app)
        .post('/pilot/create')
        .send({
            name: "Test Pilot",
            pilotCertification: "123CDE",
            age: 19,
            credits: 1000.00,
            locationPlanet: "Andvari"
        })
        const responseShip = await request(app)
        .post('/ship/create')
        .send({
                name: "Millennium Falcon2",
                fuelCapacity: 100,
                fuelLevel: 20,
                idPilot: 1,
                weightCapacity: 100
        })
        const responseContract = await request(app)
        .post('/contract/create')
        .send({
            description: "Contrato 1",
            originPlanet: "Calas",
            destinationPlanet: "Aqua",
            value: 1200
        })
        await request(app)
        .post('/resource/create')
        .send({
            idContract,
            name: 'minerals',
            weight: 35
        })
        idPilot = responsePilot.body.params.id
        idShip = responseShip.body.params.id
        idContract = responseContract.body.id
    })
    
    test('Teste api workflow', async () => {
        
        const responseFuel = await request(app)
        .patch('/ship/fuel')
        .send({
            idShip,
            fuelQuantity: 70
        })
        const responsListContracts = await request(app)
        .get('/contract/list-open-contract')
        

        const responseTravelOriginPlanet = await request(app)
        .patch('/ship/travels')
        .send({
            idShip,
            destinationPlanet: "Calas" // Contract's home planet
        })

        const responseAcceptContract = await request(app)
        .patch(`/contract/accept-contract/` + idShip + '/' + idPilot)

        const responseTravelDestinationPlanet = await request(app)
        .patch('/ship/travels')
        .send({
            idShip,
            destinationPlanet: 'Aqua' // Contract's destination planet
        })

        const responseDeliverContract = await request(app)
        .patch('/contract/deliver-contract/' + idShip + '/' + idPilot)

        expect(responseDeliverContract.body.params.id).toBe(1)
        expect(responseDeliverContract.status).toBe(200)
        expect(responseTravelDestinationPlanet.status).toBe(200)
        expect(responseAcceptContract.body.params.id).toBe(1)
        expect(responseAcceptContract.status).toBe(200)
        expect(responseTravelOriginPlanet.status).toBe(200)
        expect(responsListContracts.status).toBe(200)
        expect(responseFuel.status).toBe(200)
    })


})