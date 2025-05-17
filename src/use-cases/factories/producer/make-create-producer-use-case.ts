import { PrismaProducersRepository } from '@/repositories/prisma/prisma-producers-repository'
import { CreateProducerUseCase } from '@/use-cases/producers/create-producer'

export function makeCreateProducerUseCase() {
  const producerRepository = new PrismaProducersRepository()
  const createProducerUseCase = new CreateProducerUseCase(producerRepository)
  return createProducerUseCase
}
