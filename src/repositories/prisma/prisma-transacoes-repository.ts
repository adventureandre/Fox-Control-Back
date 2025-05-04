import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { TransactionRepository } from '../transaction-repository'

export class PrismaTransacoesRepository implements TransactionRepository {
  async create(data: Prisma.TransactionCreateManyInput) {
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

  async update(id: string, data: Prisma.TransactionUpdateInput) {
    const transacao = await prisma.transaction.update({
      where: {
        id,
      },
      data,
    })

    return transacao
  }

  async delete(id: string) {
    await prisma.transaction.delete({
      where: {
        id,
      },
    })
  }
}
