import { PrismaCustomerRepository } from '@/repositories/prisma/prisma-customer-repository'
import { GetCustomerByCpfUseCase } from '@/use-cases/customers/get-customer-by-cpf'

export function makeGetCustomerByCpfUseCase() {
  const CustomerRepository = new PrismaCustomerRepository()
  const getCustomerByCpfUseCase = new GetCustomerByCpfUseCase(
    CustomerRepository,
  )
  return getCustomerByCpfUseCase
}
