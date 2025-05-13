import { Prisma, Transaction } from '@prisma/client'

export interface TransactionRepository {
  create(data: Prisma.TransactionCreateManyInput): Promise<Transaction>
  getTransactions(page?: number, limit?: number): Promise<Transaction[]>
  findById(id: string): Promise<Transaction | null>
  update(id: string, data: Prisma.TransactionUpdateInput): Promise<Transaction>
  delete(id: string): Promise<void>
}
