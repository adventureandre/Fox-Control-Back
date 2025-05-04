import { PrismaTransacoesRepository } from '@/repositories/prisma/prisma-transacoes-repository'
import { DeleteTransactionsUseCase } from '@/use-cases/transaction/delete-transactions'

export function makeDeleteTransactionUseCase() {
  const transactionsRepository = new PrismaTransacoesRepository()
  const deleteTransactionUseCase = new DeleteTransactionsUseCase(
    transactionsRepository,
  )

  return deleteTransactionUseCase
}
