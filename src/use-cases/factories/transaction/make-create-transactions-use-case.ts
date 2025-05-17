import { PrismaTransacoesRepository } from '@/repositories/prisma/prisma-transacoes-repository'
import { CreateTransactionsUseCase } from '../../transaction/create-transactions'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

export function makeCreateTransactionsUseCase() {
  const transactionsRepository = new PrismaTransacoesRepository()
  const userRepository = new PrismaUsersRepository()
  const createTransactionsUseCase = new CreateTransactionsUseCase(
    transactionsRepository,
    userRepository,
  )
  return createTransactionsUseCase
}
