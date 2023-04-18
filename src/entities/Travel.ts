


export class Travel {
    private planet: 'Andvari' | 'Demeter' | 'Aqua' | 'Calas'
    private planets: ['Andvari', 'Demeter', 'Aqua', 'Calas']
    private costsTable: 
    {
        Andvari: ['0', 'X', '13', '23'],
        Demeter: ['X', '0', '22', '25'],
        Aqua:    ['X', '30', '0', '12'],
        Calas:   ['20', '25', '15','0']
    }
    constructor(planet: 'Andvari' | 'Demeter' | 'Aqua' | 'Calas') {
        this.planet = planet
        this.planets = ['Andvari', 'Demeter', 'Aqua', 'Calas']
        this.costsTable = {
            Andvari: ['0', 'X', '13', '23'],
            Demeter: ['X', '0', '22', '25'],
            Aqua:    ['X', '30', '0', '12'],
            Calas:   ['20', '25', '15','0']
        }
    }

    public checkIfPlanetIsRegistry(planet: string): boolean {
        if(this.planets.find( (plan) => plan === planet)) return true

        return false
    }

    public calcFuel(destinationPlanet: 'Andvari' | 'Demeter' | 'Aqua' | 'Calas'): number | false {
        const destinationIndex = this.planets.indexOf(destinationPlanet)
        const originPlanet = this.costsTable[this.planet]
        const validateTravel = originPlanet[destinationIndex] !== 'X'

        if(validateTravel) return parseInt(originPlanet[destinationIndex])

        return false
    }
}