import { Transaction } from "../entities";
import { IContractRepository, IPilotRepository, IResourceRepository, IShipRepository, ITransactionRepository } from "../repositories/interfaces";
import { contractServicesTypes, pilotServiceTypes, reporsServicesType, resourceServicesTypes } from "./types";

const PLANETS = ['Aqua', 'Demeter', 'Calas', 'Andvari']
const RESOURCES = ['food', 'minerals', 'water']
const PERCENTAGE = 100
export class ReportsServices {
    constructor (
        private readonly contractRepository: IContractRepository,
        private readonly resourceRepository: IResourceRepository,
        private readonly transactionRepository: ITransactionRepository,
        private readonly pilotRepository: IPilotRepository
    ) {}

    async transactionsDesc(): Promise<string[]> {
        const transactions = await this.transactionRepository.selectAll()

        if(!transactions) return transactions

        const transactionsJSON = transformTransactionInString(transactions) 

        return transactionsJSON
    }

    async weightSuppliesPlanetReport(): Promise<any> {
        const resourcesByPlanet = await this.resourceRepository.selectSuppliesPlanetReport()
        const report = generateReports(resourcesByPlanet)

        return report
    }

    async percentageResourcesByPilot(): Promise<any> {
        const pilots = await this.pilotRepository.selectAll()
        const report: any = {}
        for(const pilot of pilots) {
            const contracts = await this.contractRepository.selectByIdPilotAndClosedStatus(pilot.idPilot)
            const idsContracts = getIdContracts(contracts)
            const resources = await this.resourceRepository.selectByIdsContracts(idsContracts)
            generateReportsPercentage(resources, report, pilot)
        }

        return report
    }
}

const transformTransactionInString = (transactions: reporsServicesType.transaction[]): string[] => {
    const transactionsMap = transactions.map( transaction => new Transaction(transaction.idTransaction, transaction.description, transaction.value).toString())

    return transactionsMap
}

const getIdContracts = (contracts: contractServicesTypes.selectAll[]): number[] => {
    const idsContracts: number[] = []

    contracts.forEach( (contract) => idsContracts.push(contract.idContract))

    return idsContracts
}

const generateReportsPercentage = (resources: reporsServicesType.resources[], report: any, pilot: pilotServiceTypes.selectById) => {
    let weightTotal = 0
    report[pilot.name] = {
        food: 0,
        water: 0,
        minerals: 0
    }
    for(const resource of resources) {
        weightTotal += parseInt(resource.weight.toString())
        report[pilot.name][resource.name] = (parseInt(resource.weight.toString()) + report[pilot.name][resource.name])
    }

    for(const obj of Object.keys(report[pilot.name])) {
        report[pilot.name][obj] = (report[pilot.name][obj] * PERCENTAGE) / weightTotal
    }
}

const generateReports = (resourcesByPlanet: reporsServicesType.resources[]): string[] => {
    const report: any = {}

    for(const planet of PLANETS) {
        report[planet] = {
            sent: {
                food: 0,
                water: 0,
                minerals: 0
            },
            received: {
                food: 0,
                water: 0,
                minerals: 0
            }
        }
    }
    populateWeightPlanetReport(resourcesByPlanet, report)

    return report
}

const populateWeightPlanetReport = (resourcesByPlanet: reporsServicesType.resources[], report: any) => {
    resourcesByPlanet.forEach( (resource) => {
        const originPlanet = resource.contract.originPlanet
        const destinationPlanet = resource.contract.destinationPlanet

        calcWeightPlanetReport(RESOURCES[0], PLANETS[0], report, originPlanet,resource, 'origin')
        calcWeightPlanetReport(RESOURCES[1], PLANETS[0], report, originPlanet,resource, 'origin')
        calcWeightPlanetReport(RESOURCES[2], PLANETS[0], report, originPlanet,resource, 'origin')
        calcWeightPlanetReport(RESOURCES[0], PLANETS[1], report, originPlanet,resource, 'origin')
        calcWeightPlanetReport(RESOURCES[1], PLANETS[1], report, originPlanet,resource, 'origin')
        calcWeightPlanetReport(RESOURCES[2], PLANETS[1], report, originPlanet,resource, 'origin')
        calcWeightPlanetReport(RESOURCES[0], PLANETS[2], report, originPlanet,resource, 'origin')
        calcWeightPlanetReport(RESOURCES[1], PLANETS[2], report, originPlanet,resource, 'origin')
        calcWeightPlanetReport(RESOURCES[2], PLANETS[2], report, originPlanet,resource, 'origin')
        calcWeightPlanetReport(RESOURCES[0], PLANETS[3], report, originPlanet,resource, 'origin')
        calcWeightPlanetReport(RESOURCES[1], PLANETS[3], report, originPlanet,resource, 'origin')
        calcWeightPlanetReport(RESOURCES[2], PLANETS[3], report, originPlanet,resource, 'origin')
        calcWeightPlanetReport(RESOURCES[0], PLANETS[0], report, destinationPlanet,resource, 'destination') 
        calcWeightPlanetReport(RESOURCES[1], PLANETS[0], report, destinationPlanet,resource, 'destination') 
        calcWeightPlanetReport(RESOURCES[2], PLANETS[0], report, destinationPlanet,resource, 'destination') 
        calcWeightPlanetReport(RESOURCES[0], PLANETS[1], report, destinationPlanet,resource, 'destination') 
        calcWeightPlanetReport(RESOURCES[1], PLANETS[1], report, destinationPlanet,resource, 'destination') 
        calcWeightPlanetReport(RESOURCES[2], PLANETS[1], report, destinationPlanet,resource, 'destination') 
        calcWeightPlanetReport(RESOURCES[0], PLANETS[2], report, destinationPlanet,resource, 'destination') 
        calcWeightPlanetReport(RESOURCES[1], PLANETS[2], report, destinationPlanet,resource, 'destination') 
        calcWeightPlanetReport(RESOURCES[2], PLANETS[2], report, destinationPlanet,resource, 'destination') 
        calcWeightPlanetReport(RESOURCES[0], PLANETS[3], report, destinationPlanet,resource, 'destination') 
        calcWeightPlanetReport(RESOURCES[1], PLANETS[3], report, destinationPlanet,resource, 'destination') 
        calcWeightPlanetReport(RESOURCES[2], PLANETS[3], report, destinationPlanet,resource, 'destination') 

        return report
    })
}

const calcWeightPlanetReport = (resourceName: string, planet: string, report: any, originPlanet: string, resource: any, cases: string) => {

    switch(cases) {
        case 'origin':
            if(resource.name === resourceName && originPlanet === planet) {
                report[originPlanet].sent[resourceName] = report[originPlanet].sent[resourceName] + parseInt(resource.weight.toString())
            }
        break
        
        case 'destination':
            if(resource.name === resourceName && originPlanet === planet) {
                report[originPlanet].received[resourceName] = report[originPlanet].received[resourceName] + parseInt(resource.weight.toString())
            }
        break
    }
}
