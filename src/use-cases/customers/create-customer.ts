import { CustomerRepository } from '@/repositories/customer-repository'

interface CreateCustomerUseCaseRequest {
  name: string
  cpf: string
  group?: string
  address?: string
  city?: string
  state?: string
  phone?: string
  email?: string
  stateRegistration?: string
  active?: boolean
}
export class CreateCustomerUseCase {
  constructor(private customerRepository: CustomerRepository) {}

  async execute(data: CreateCustomerUseCaseRequest) {
    // Validação adicional, se necessário
    if (!data.cpf || !data.name) {
      throw new Error('Os campos cpf e nome são obrigatórios.')
    }

    const customer = await this.customerRepository.create(data)

    return customer
  }
}
