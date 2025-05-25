import { Prisma, Customer } from '@prisma/client'

export interface CustomerRepository {
  create(data: Prisma.CustomerCreateInput): Promise<Customer | null>
  findById(id: string): Promise<Customer | null>
  findByCpf(cpf: string): Promise<Customer | null>
  delete(id: string): Promise<void>
  getCustomer(): Promise<Customer[] | []>
}
