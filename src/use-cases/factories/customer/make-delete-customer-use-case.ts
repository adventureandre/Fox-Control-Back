import { PrismaCustomerRepository } from '@/repositories/prisma/prisma-customer-repository'
import { DeleteCustomerUseCase } from '@/use-cases/customers/delete-customer'

export function makeDeleteCustomerUseCase() {
  const customerRepository = new PrismaCustomerRepository()
  const deleteCustomerUseCase = new DeleteCustomerUseCase(customerRepository)

  return deleteCustomerUseCase
}
