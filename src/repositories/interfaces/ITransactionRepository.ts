export type transactionRepositoryType  = {
    idTransaction: number
    description: string
    value: number
}


export interface ITransactionRepository {
    create(description: string, value: number): Promise<number>

    update(idTransaction: number, description: string, value: number): Promise<number>

    selectAll(): Promise<transactionRepositoryType[]>

    selectById(idTransaction: number): Promise<transactionRepositoryType | null>

    delete(idTransaction: number): Promise<number>
}