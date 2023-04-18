import { transaction } from "../../entities/Transaction";
import { ITransactionRepository } from "../interfaces";
import { transactionRepositoryType } from "../interfaces/ITransactionRepository";



export class TransactionRepositoryInMemory implements ITransactionRepository {
    private transactions: transaction[] = []
    private idCount: number = 1

    async create(description: string, value: number): Promise<number> {
        const transaction: transaction = {
            idTransaction: this.idCount,
            description,
            value,
            createdAt: new Date(),
            updatedAt: new Date()
        } 
        this.transactions.push(transaction)
        this.idCount += 1

        return transaction.idTransaction
    }
    async update(idTransaction: number, description: string, value: number): Promise<number> {
        const transaction = this.transactions.find( ele => ele.idTransaction === idTransaction)
        if(!transaction) return 0
        const findIndex = this.transactions.findIndex( ele => ele.idTransaction === idTransaction)
        this.transactions[findIndex] = {
            createdAt: transaction.createdAt,
            description,
            idTransaction,
            updatedAt: new Date(),
            value
        }
        return idTransaction
    }
    async selectAll(): Promise<transactionRepositoryType[]> {
        return this.transactions as unknown as transactionRepositoryType[]
    }
    async selectById(idTransaction: number): Promise<transactionRepositoryType | null> {
        const findTransaction = this.transactions.find( ele => ele.idTransaction === idTransaction)

        if(!findTransaction) return null

        return findTransaction as unknown as transactionRepositoryType
    }
    async delete(idTransaction: number): Promise<number> {
        const findIndex = this.transactions.findIndex( ele => ele.idTransaction === idTransaction)

        this.transactions.splice(findIndex, 1)
        this.idCount -= 1

        return idTransaction
    }

}