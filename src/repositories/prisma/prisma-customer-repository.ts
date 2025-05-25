import { Prisma } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import { CustomerRepository } from '../customer-repository'

export class PrismaCustomerRepository implements CustomerRepository {
  async create(data: Prisma.CustomerCreateInput) {
    return await prisma.customer.create({ data })
  }

  async findById(id: string) {
    return await prisma.customer.findUnique({ where: { id } })
  }

  async findByCpf(cpf: string) {
    return await prisma.customer.findUnique({ where: { cpf } })
  }

  async delete(id: string) {
    await prisma.customer.delete({ where: { id } })
  }

  async getCustomer() {
    return await prisma.customer.findMany()
  }
}
