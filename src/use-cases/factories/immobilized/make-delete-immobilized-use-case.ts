import { PrismaImmobilizedRepository } from '@/repositories/prisma/prisma-immobilized-repository'
import { DeleteImmobilizedUseCase } from '@/use-cases/immobilized/delete'

export function makeDeleteImmobilizedUseCase() {
  const immobilizedRepository = new PrismaImmobilizedRepository()
  const deleteImmobilizedUseCase = new DeleteImmobilizedUseCase(
    immobilizedRepository,
  )

  return deleteImmobilizedUseCase
}
