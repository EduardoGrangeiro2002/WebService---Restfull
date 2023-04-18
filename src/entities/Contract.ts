
export type contract = {
    idContract: number
    description: string
    payload: number
    originPlanet: string
    destinationPlanet: string
    idPilot: number | null
    idStatus: number
    status?: {
        status: string
        idStatus: number
    }
    value: number
    createdAt: Date
    updatedAt: Date
}


export class Contract {
    private idContract: number | null
    private description: string
    private payload: number
    private originPlanet: string
    private destinationPlanet: string
    private idPilot: number | null
    private idStatus: number
    private value: number

    constructor(
        idContract: number | null, 
        description: string,
        payload: number,
        originPlanet: string,
        destinationPlanet: string,
        idPilot: number | null,
        idStatus: number,
        value: number
        ) {
            this.idContract = idContract
            this.description = description
            this.payload = payload
            this.originPlanet = originPlanet
            this.destinationPlanet = destinationPlanet
            this.idPilot = idPilot
            this.idStatus = idStatus
            this.value = value
    }

    public setIdContract(idContract: number): void {
        this.idContract = idContract
    }

    public getIdContract(): number | null {
        return this.idContract
    }

    public setDescription(description: string){
        this.description = description
    }

    public getDescription(): string {
        return this.description
    }

    public setPayload(payload: number): void {
        this.payload = payload
    }

    public getPayload(): number {
        return this.payload
    }

    public setOriginPlanet(originPlanet: string) {
        this.originPlanet = originPlanet
    }

    public getOriginPlanet(): string {
        return this.originPlanet
    }

    public setDestinationPlanet(destinationPlanet: string): void {
        this.destinationPlanet = destinationPlanet
    }

    public getDestinationPlanet(): string {
        return this.destinationPlanet
    }

    public setIdPilot(idPilot: number): void {
        this.idPilot = idPilot
    }

    public getIdPilot(): number | null {
        return this.idPilot
    }

    public setIdStatus(idStatus: number): void {
        this.idStatus = idStatus
    }

    public getIdStatus(): number {
        return this.idStatus
    }

    public setValue(value: number): void {
        this.value = value
    }

    public getValue(): number {
        return this.value
    }
}