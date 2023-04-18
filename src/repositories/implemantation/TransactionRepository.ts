import { PrismaClient } from "@prisma/client";
import { ITransactionRepository, transactionRepositoryType } from "../interfaces/ITransactionRepository";



export class TransactionRepository implements ITransactionRepository {
    private prismaClient: PrismaClient

    constructor() {
        this.prismaClient = new PrismaClient()
    }
    async create(description: string, value: number): Promise<number> {
        const insertId = await this.prismaClient.transaction.create({
            data: {
                description,
                value
            },
            select: {idTransaction: true}
        })

        return insertId.idTransaction
    }
    async update(idTransaction: number, description: string, value: number): Promise<number> {
        const updatedId = await this.prismaClient.transaction.update({
            data: {
                description,
                value
            },
            select: {
                idTransaction: true
            },
            where: {
                idTransaction
            }
        })

        return updatedId.idTransaction
    }
    async selectAll(): Promise<transactionRepositoryType[]> {
        const transactions = await this.prismaClient.transaction.findMany({
            orderBy: {
                createdAt: 'asc'
            }
        })

        return transactions as unknown as transactionRepositoryType[]
    }
    async selectById(idTransaction: number): Promise<transactionRepositoryType | null> {
        const transaction = await this.prismaClient.transaction.findUnique({
            where: {idTransaction}
        })

        if(!transaction) return transaction

        return transaction as unknown as transactionRepositoryType
    }
    async delete(idTransaction: number): Promise<number> {
        const deletedId  = await this.prismaClient.transaction.delete({
            where: {idTransaction},
            select: {idTransaction: true}
        })

        return deletedId.idTransaction
    }

}