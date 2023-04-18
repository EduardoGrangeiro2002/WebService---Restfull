
export type pilot = {
    idPilot: number
    name: string
    pilotCertification: string
    age: number
    credits: number
    locationPlanet: string
    createdAt: Date
    updatedAt: Date
}


export class Pilot {
    private name: string
    private pilotCertification: string
    private age: number
    private credits: number
    private locationPlanet: string

    constructor(name: string, pilotCertification: string, age: number,
                credits: number, locationPlanet: string) {
            this.name = name
            this.pilotCertification = pilotCertification
            this.age = age
            this.credits = credits
            this.locationPlanet = locationPlanet
    }

    public setName(name: string): void {
        this.name = name
    }

    public getName(): string {
        return this.name
    }

    public setPilotCertification (pilotCertification: string): void {
        this.pilotCertification = pilotCertification
    }

    public getPilotCertification(): string {
        return this.pilotCertification
    }

    public setAge(age: number): void {
        this.age = age
    }

    public getAge(): number {
        return this.age
    }

    public setCredits(credits: number) {
        this.credits = credits
    }

    public getCredits(): number {
        return this.credits
    }

    public setLocationPlanet(locationPlanet: string): void {
        this.locationPlanet = locationPlanet
    }

    public getLocationPlanet(): string {
        return this.locationPlanet
    }

    public checkIfAgeIsOverYearsOld(): boolean {
        const minimumAge = 18
        return this.age >= minimumAge
    }

    public checkPilotCertification(): boolean {
        return true
    }

    public getPilotDTO() {
        return {
        }
    }
}