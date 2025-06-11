import { PrismaImmobilizedRepository } from '@/repositories/prisma/prisma-immobilized-repository'
import { GetImmobilizedUseCase } from '@/use-cases/immobilized/get'

export function makeGetImmobilizedUseCase() {
  const immobilizedRepository = new PrismaImmobilizedRepository()
  const getImmobilizedUseCase = new GetImmobilizedUseCase(immobilizedRepository)

  return getImmobilizedUseCase
}
