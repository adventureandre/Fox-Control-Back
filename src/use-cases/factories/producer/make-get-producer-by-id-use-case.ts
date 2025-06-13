import { PrismaProducersRepository } from '@/repositories/prisma/prisma-producers-repository'
import { GetProducerByIdUseCase } from '@/use-cases/producers/get-producer-by-id'

export function makeGetProducerByIdUseCase() {
  const producerRepository = new PrismaProducersRepository()
  const getProducerByCpfUseCase = new GetProducerByIdUseCase(producerRepository)
  return getProducerByCpfUseCase
}
