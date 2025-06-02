import { PrismaFarmRepository } from '@/repositories/prisma/prisma-farm-repository'
import { PrismaProducersRepository } from '@/repositories/prisma/prisma-producers-repository'
import { GetFarmsByProducerUseCase } from '@/use-cases/farm/get-farms-by-producer'

export function makeGetFarmsByProducerUseCase() {
  const farmRepository = new PrismaFarmRepository()
  const producerRepository = new PrismaProducersRepository()
  const getFarmsByProducerUseCase = new GetFarmsByProducerUseCase(
    farmRepository,
    producerRepository,
  )
  return getFarmsByProducerUseCase
}
