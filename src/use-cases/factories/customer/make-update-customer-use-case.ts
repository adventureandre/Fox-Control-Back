import { PrismaCustomerRepository } from '@/repositories/prisma/prisma-customer-repository'
import { UpdateCustomerUseCase } from '@/use-cases/customers/update-customer'

export function makeUpdateCustomerUseCase() {
  const customerRepository = new PrismaCustomerRepository()
  return new UpdateCustomerUseCase(customerRepository)
}
