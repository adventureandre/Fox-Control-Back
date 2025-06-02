import { FarmRepository } from '@/repositories/farm-repository'
import { ProducerRepository } from '@/repositories/producer-repository'
import { Farm } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface CreateFarmUseCaseRequest {
  name: string
  city: string
  hectares: number
  latitude: number
  longitude: number
  producer_id: string
  active?: boolean
}

interface CreateFarmUseCaseResponse {
  farm: Farm
}

export class CreateFarmUseCase {
  constructor(
    private farmRepository: FarmRepository,
    private producerRepository: ProducerRepository,
  ) {}

  async execute({
    name,
    city,
    hectares,
    latitude,
    longitude,
    producer_id,
    active,
  }: CreateFarmUseCaseRequest): Promise<CreateFarmUseCaseResponse> {
    // Verificar se o produtor existe
    const producer = await this.producerRepository.findById(producer_id)

    if (!producer) {
      throw new ResourceNotFoundError()
    }

    // Criar a fazenda
    const farm = await this.farmRepository.create({
      name,
      city,
      hectares,
      latitude,
      longitude,
      active: active !== undefined ? active : true,
      producer: {
        connect: {
          id: producer_id,
        },
      },
    })

    if (!farm) {
      throw new Error('Erro ao criar fazenda')
    }

    return { farm }
  }
}
