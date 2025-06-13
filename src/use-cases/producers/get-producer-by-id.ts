import { ProducerRepository } from '@/repositories/producer-repository'
import { Producers } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface GetProducerByIdUseCaseRequest {
  producer_id: string
}

interface GetProducerByIdUseCaseResponse {
  producer: Producers
}

export class GetProducerByIdUseCase {
  constructor(private producerRepository: ProducerRepository) {}

  async execute({
    producer_id,
  }: GetProducerByIdUseCaseRequest): Promise<GetProducerByIdUseCaseResponse> {
    const producer = await this.producerRepository.findById(producer_id)

    if (!producer) {
      throw new ResourceNotFoundError()
    }

    return { producer }
  }
}
