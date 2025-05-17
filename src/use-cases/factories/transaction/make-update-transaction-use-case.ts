import { PrismaTransacoesRepository } from '@/repositories/prisma/prisma-transacoes-repository'
import { UpdateTransactionUseCase } from '@/use-cases/transaction/update-transaction'

export function makeUpdateTransactionUseCase() {
  const transactionsRepository = new PrismaTransacoesRepository()
  const updateTransactionUseCase = new UpdateTransactionUseCase(
    transactionsRepository,
  )
  return updateTransactionUseCase
}
