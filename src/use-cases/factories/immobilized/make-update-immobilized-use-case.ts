import { PrismaImmobilizedRepository } from '@/repositories/prisma/prisma-immobilized-repository'
import { UpdateImmobilizedUseCase } from '@/use-cases/immobilized/update'

export function makeUpdateImmobilizedUseCase() {
  const immobilizedRepository = new PrismaImmobilizedRepository()
  const updateImmobilizedUseCase = new UpdateImmobilizedUseCase(
    immobilizedRepository,
  )

  return updateImmobilizedUseCase
}
