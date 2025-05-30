import { PrismaProducersRepository } from '@/repositories/prisma/prisma-producers-repository'
import { UpdateProducerUseCase } from '@/use-cases/producers/update-producer'

export function makeUpdateProducerUseCase() {
  const producerRepository = new PrismaProducersRepository()
  const updateProducerUseCase = new UpdateProducerUseCase(producerRepository)
  return updateProducerUseCase
}
