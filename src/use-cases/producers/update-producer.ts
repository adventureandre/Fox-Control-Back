import { ProducerRepository } from '@/repositories/producer-repository'
import { Producers } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface UpdateProducerUseCaseRequest {
  id: string
  name?: string
  cpf?: string
  phone?: string
  group?: string
  farm?: string
  email?: string
  address?: string
  city?: string
  state?: string
  active?: boolean
}

interface UpdateProducerUseCaseResponse {
  producer: Producers
}

export class UpdateProducerUseCase {
  constructor(private producerRepository: ProducerRepository) {}

  async execute({
    id,
    name,
    cpf,
    phone,
    group,
    farm,
    email,
    address,
    city,
    state,
    active,
  }: UpdateProducerUseCaseRequest): Promise<UpdateProducerUseCaseResponse> {
    const producer = await this.producerRepository.findById(id)

    if (!producer) {
      throw new ResourceNotFoundError()
    }

    // Se tiver CPF e for diferente do atual, é necessário verificar se já existe outro produtor com esse CPF
    if (cpf && cpf !== producer.cpf) {
      const producerWithSameCpf = await this.producerRepository.findByCpf(cpf)
      if (producerWithSameCpf && producerWithSameCpf.id !== id) {
        throw new Error('Já existe um produtor com esse CPF cadastrado')
      }
    }

    const updatedProducer = await this.producerRepository.update({
      id,
      data: {
        name,
        cpf,
        phone,
        group,
        farm,
        email,
        address,
        city,
        state,
        active,
      },
    })

    return { producer: updatedProducer }
  }
}
