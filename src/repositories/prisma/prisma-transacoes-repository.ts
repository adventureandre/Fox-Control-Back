import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { TransactionRepository } from '../transaction-repository'

export class PrismaTransacoesRepository implements TransactionRepository {
  async create(data: Prisma.TransactionCreateInput) {
    const transacoes = await prisma.transaction.create({ data })
    return transacoes
  }

  async findById(id: string) {
    const transacoe = await prisma.transaction.findUnique({
      where: {
        id,
      },
    })

    return transacoe
  }
}
