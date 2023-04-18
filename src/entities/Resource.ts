

export type resource = {
    idResource: number
    idContract: number
    name: string
    weight: number
}


export class Resource {
    private idResource: number | null
    private idContract: number
    private name: string
    private weight: number

    constructor (
        idResource: number | null,
        idContract: number,
        name: string,
        weight: number
    ) {
        this.idResource = idResource
        this.idContract = idContract
        this.name = name
        this.weight = weight
    }

    public setIdResource(idResource: number): void {
        this.idResource = idResource
    }

    public getIdResource(): number | null {
        return this.idResource
    }

    public setIdContract(idContract: number): void {
        this.idContract  = idContract
    }

    public getIdContract(): number {
        return this.idContract
    }

    public setName(name: string): void {
        this.name = name
    }

    public getName(): string {
        return this.name
    }

    public setWeight(weight: number): void {
        this.weight = weight
    }

    public getWeight(): number {
        return this.weight
    }

    public checkIfNameIsValidate(possibleNames: string[]): boolean {
        if(possibleNames.find( (possibleName) => possibleName === this.getName())) {
            return true
        }
        
        return false
    }
}