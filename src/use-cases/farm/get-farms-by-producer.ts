import { FarmRepository } from '@/repositories/farm-repository'
import { ProducerRepository } from '@/repositories/producer-repository'
import { Farm } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface GetFarmsByProducerUseCaseRequest {
  producerId: string
  active?: boolean
}

interface GetFarmsByProducerUseCaseResponse {
  farms: Farm[]
}

export class GetFarmsByProducerUseCase {
  constructor(
    private farmRepository: FarmRepository,
    private producerRepository: ProducerRepository,
  ) {}

  async execute({
    producerId,
    active,
  }: GetFarmsByProducerUseCaseRequest): Promise<GetFarmsByProducerUseCaseResponse> {
    // Verificar se o produtor existe
    const producer = await this.producerRepository.findById(producerId)

    if (!producer) {
      throw new ResourceNotFoundError()
    }

    const farms = await this.farmRepository.getFarmsByProducer(
      producerId,
      active,
    )

    return { farms }
  }
}
