import { Prisma, Transaction } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { TransactionRepository } from '../transaction-repository'

export class PrismaTransacoesRepository implements TransactionRepository {
  async getTransactions(page: number, limit: number) {
    let transactions: Transaction[] = []
    if (page && limit) {
      transactions = await prisma.transaction.findMany({
        skip: page && limit ? (page - 1) * limit : undefined,
        take: limit || undefined,
        orderBy: {
          date: 'desc',
        },
      })
    } else {
      transactions = await prisma.transaction.findMany({
        orderBy: {
          date: 'desc',
        },
      })
    }

    return transactions
  }

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
