import { PrismaFarmRepository } from '@/repositories/prisma/prisma-farm-repository'
import { PrismaProducersRepository } from '@/repositories/prisma/prisma-producers-repository'
import { CreateFarmUseCase } from '@/use-cases/farm/create-farm'

export function makeCreateFarmUseCase() {
  const farmRepository = new PrismaFarmRepository()
  const producerRepository = new PrismaProducersRepository()
  const createFarmUseCase = new CreateFarmUseCase(
    farmRepository,
    producerRepository,
  )
  return createFarmUseCase
}
