export type shipDTO = {
    idShip: number | null,
    name: string, 
    fuelCapacity: number, 
    fuelLevel: number, 
    weightCapacity: number,
    idPilot: number | null    
}

export type ship = {
    idShip: number
    name: string
    fuelCapacity: number
    fuelLevel: number
    idPilot: number | null
    weightCapacity: number
    createdAt: Date
    updatedAt: Date
}


export class Ship {
    private name: string
    private fuelCapacity: number
    private fuelLevel: number
    private weightCapacity: number
    private idPilot: number | null
    private idShip: number | null

    constructor (
        idShip: number | null,
        name: string, 
        fuelCapacity: number, 
        fuelLevel: number, 
        weightCapacity: number,
        idPilot: number | null
        ) {
            this.idShip = idShip
            this.name = name
            this.fuelCapacity = fuelCapacity
            this.fuelLevel = fuelLevel
            this.weightCapacity = weightCapacity
            this.idPilot = idPilot
        }
    public setIdShip(idShip: number): void {
        this.idShip = idShip
    }

    public getIdShip(): number | null {
        return this.idShip
    }

    public setName(name: string): void {
        this.name = name
    }

    public getName(): string {
        return this.name
    }

    public setFuelCapacity(fuelCapacity: number): void {
        this.fuelCapacity = fuelCapacity
    }

    public getFuelCapacity(): number {
        return this.fuelCapacity
    }

    public setFuelLevel(fuelLevel: number): void {
        this.fuelLevel = fuelLevel
    }

    public getFuelLevel(): number {
        return this.fuelLevel
    }

    public setWeightCapacity(weightCapacity: number): void {
        this.weightCapacity = weightCapacity
    }

    public getWeightCapacity(): number {
        return this.weightCapacity
    }

    public setIdPilot(idPilot: number): void {
        this.idPilot = idPilot
    }

    public getIdPilot(): number | null {
        return this.idPilot
    }

    

    public returnShipDTO(): shipDTO {
        const shipDTO: shipDTO = {
            idShip: this.getIdShip(),
            name: this.getName(),
            fuelCapacity: this.getFuelCapacity(),
            fuelLevel: this.getFuelLevel(),
            weightCapacity: this.getWeightCapacity(),
            idPilot: this.getIdPilot()
        }

        return shipDTO
    }

}