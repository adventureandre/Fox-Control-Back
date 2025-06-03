import { CustomerRepository } from '@/repositories/customer-repository'
import { Customer } from '@prisma/client'

interface UpdateCustomerUseCaseRequest {
  id: string
  data: Partial<Omit<Customer, 'id'>>
}

export class UpdateCustomerUseCase {
  constructor(private customerRepository: CustomerRepository) {}

  async execute({ id, data }: UpdateCustomerUseCaseRequest) {
    const customer = await this.customerRepository.findById(id)
    if (!customer) {
      throw new Error('Cliente não encontrado')
    }
    const updated = await this.customerRepository.update(id, data)
    return { customer: updated }
  }
}
