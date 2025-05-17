import { PrismaTransacoesRepository } from '@/repositories/prisma/prisma-transacoes-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { CreateTransactionsUseCase } from '@/use-cases/transaction/create-transactions'

export function makeCreateTransactionsUseCase() {
  const transactionsRepository = new PrismaTransacoesRepository()
  const userRepository = new PrismaUsersRepository()
  const createTransactionsUseCase = new CreateTransactionsUseCase(
    transactionsRepository,
    userRepository,
  )
  return createTransactionsUseCase
}
