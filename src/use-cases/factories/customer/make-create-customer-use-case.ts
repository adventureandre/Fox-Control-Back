import { PrismaCustomerRepository } from '@/repositories/prisma/prisma-customer-repository'
import { CreateCustomerUseCase } from '@/use-cases/customers/create-customer'

export function makeCreateCustomerUseCase() {
  const customerRepository = new PrismaCustomerRepository()
  const createCustomerUseCase = new CreateCustomerUseCase(customerRepository)
  return createCustomerUseCase
}
