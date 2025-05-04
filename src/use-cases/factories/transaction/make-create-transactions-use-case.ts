import { PrismaTransacoesRepository } from '@/repositories/prisma/prisma-transacoes-repository'
import { CreateTransactionsUseCase } from '../../transaction/create-transactions'

export function makeCreateTransactionsUseCase() {
  const transactionsRepository = new PrismaTransacoesRepository()
  const createTransactionsUseCase = new CreateTransactionsUseCase(
    transactionsRepository,
  )
  return createTransactionsUseCase
}
