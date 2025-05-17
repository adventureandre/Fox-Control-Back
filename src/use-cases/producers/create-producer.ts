import { ProducerRepository } from '@/repositories/producer-repository'

interface CreateProducerUseCaseRequest {
  name: string
  cpf: string
}
export class CreateProducerUseCase {
  constructor(private producerRepository: ProducerRepository) {}

  async execute({ cpf, name }: CreateProducerUseCaseRequest) {
    // Validação adicional, se necessário
    if (!cpf || !name) {
      throw new Error('Os campos cpf e nome são obrigatórios.')
    }

    const producer = await this.producerRepository.create({
      cpf,
      name,
    })

    return producer
  }
}
