import { ProducerRepository } from '@/repositories/producer-repository'

interface CreateProducerUseCaseRequest {
  name: string
  cpf: string
  group?: string
  address?: string
  city?: string
  state?: string
  phone?: string
  email?: string
  farm?: string
  active?: boolean
}
export class CreateProducerUseCase {
  constructor(private producerRepository: ProducerRepository) {}

  async execute(data: CreateProducerUseCaseRequest) {
    // Validação adicional, se necessário
    if (!data.cpf || !data.name) {
      throw new Error('Os campos cpf e nome são obrigatórios.')
    }

    const producer = await this.producerRepository.create(data)

    return producer
  }
}
