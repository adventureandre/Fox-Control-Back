import { PrismaProducersRepository } from '@/repositories/prisma/prisma-producers-repository'
import { GetProducerByCpfUseCase } from '@/use-cases/producers/get-producer-by-cpf'

export function makeGetProducerByCpfUseCase() {
  const producerRepository = new PrismaProducersRepository()
  const getProducerByCpfUseCase = new GetProducerByCpfUseCase(
    producerRepository,
  )
  return getProducerByCpfUseCase
}
