import { Prisma, Transaction } from '@prisma/client'

export interface TransactionRepository {
  create(data: Prisma.TransactionCreateInput): Promise<Transaction>
  findById(id: string): Promise<Transaction | null>
}
