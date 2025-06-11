import { PrismaImmobilizedRepository } from '@/repositories/prisma/prisma-immobilized-repository'
import { ListImmobilizedUseCase } from '@/use-cases/immobilized/list'

export function makeListImmobilizedUseCase() {
  const immobilizedRepository = new PrismaImmobilizedRepository()
  const listImmobilizedUseCase = new ListImmobilizedUseCase(
    immobilizedRepository,
  )

  return listImmobilizedUseCase
}
