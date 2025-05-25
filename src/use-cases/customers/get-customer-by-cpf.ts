import { CustomerRepository } from '@/repositories/customer-repository'
import { Customer } from '@prisma/client'

interface GetCustomerByCpfUseCaseRequest {
  cpf: string
}

interface GetCustomerByCpfUseCaseResponse {
  customer: Customer | null
}

export class GetCustomerByCpfUseCase {
  constructor(private customerRepository: CustomerRepository) {}

  async execute({
    cpf,
  }: GetCustomerByCpfUseCaseRequest): Promise<GetCustomerByCpfUseCaseResponse> {
    const customer = await this.customerRepository.findByCpf(cpf)

    return { customer }
  }
}
