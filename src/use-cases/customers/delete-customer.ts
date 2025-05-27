import { CustomerRepository } from '@/repositories/customer-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface DeleteCustomerUseCaseRequest {
  id: string
}

export class DeleteCustomerUseCase {
  constructor(private customerRepository: CustomerRepository) {}

  async execute({ id }: DeleteCustomerUseCaseRequest) {
    const customer = await this.customerRepository.findById(id)

    if (!customer) {
      throw new ResourceNotFoundError()
    }

    await this.customerRepository.delete(id)

    return { customer }
  }
}
