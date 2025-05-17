import { ProducerRepository } from '@/repositories/producer-repository'
import { Producers } from '@prisma/client'

interface GetProducerByCpfUseCaseRequest {
  cpf: string
}

interface GetProducerByCpfUseCaseResponse {
  producer: Producers | null
}

export class GetProducerByCpfUseCase {
  constructor(private producerRepository: ProducerRepository) {}

  async execute({
    cpf,
  }: GetProducerByCpfUseCaseRequest): Promise<GetProducerByCpfUseCaseResponse> {
    const producer = await this.producerRepository.findByCpf(cpf)

    return { producer }
  }
}
