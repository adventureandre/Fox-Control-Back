import { PrismaTransacoesRepository } from '@/repositories/prisma/prisma-transacoes-repository'
import { GetTransactionsUseCase } from '@/use-cases/transaction/get-transactions'

export function makeGetTransactionsUseCase() {
  const transactionsRepository = new PrismaTransacoesRepository()
  const getTransactionsUseCase = new GetTransactionsUseCase(
    transactionsRepository,
  )
  return getTransactionsUseCase
}
