export type transaction = {
    idTransaction: number
    description: string
    value: number
    createdAt: Date
    updatedAt: Date
}

export class Transaction {
    private idTransaction: number | null
    private description: string
    private value: number

    constructor(idTransaction: number | null, description: string, value: number){
        this.idTransaction = idTransaction
        this.description = description
        this.value = value
    }

    public setIdTransaction(idTransaction: number): void {
        this.idTransaction = idTransaction
    }

    public getIdTransaction(): number | null {
        return this.idTransaction
    }

    public setDescription(description: string): void {
        this.description = description
    }

    public getDescription(): string {
        return this.description
    }

    public setValue(value: number): void {
        this.value = value
    }

    public getValue(): number {
        return this.value
    }

    public toString(): string {
        return `${this.getDescription()}: ${ this.getValue() <  0 ? this.getValue().toString().replace('-', '-₭') : '₭' + this.getValue()}`
    }
}