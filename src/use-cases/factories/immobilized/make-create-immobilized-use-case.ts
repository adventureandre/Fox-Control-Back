import { PrismaImmobilizedRepository } from '@/repositories/prisma/prisma-immobilized-repository'
import { CreateImmobilizedUseCase } from '@/use-cases/immobilized/create'

export function makeCreateImmobilizedUseCase() {
  const immobilizedRepository = new PrismaImmobilizedRepository()
  const createImmobilizedUseCase = new CreateImmobilizedUseCase(
    immobilizedRepository,
  )
  return createImmobilizedUseCase
}
