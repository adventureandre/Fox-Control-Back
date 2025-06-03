import { Prisma } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import { SupplierRepository } from '../supplier-repository'

export class PrismaSupplierRepository implements SupplierRepository {
  async create(data: Prisma.SupplierCreateInput) {
    return await prisma.supplier.create({ data })
  }

  async findById(id: string) {
    return await prisma.supplier.findUnique({ where: { id } })
  }

  async findByCpf(cpf: string) {
    return await prisma.supplier.findUnique({ where: { cpf } })
  }

  async delete(id: string) {
    await prisma.supplier.delete({ where: { id } })
  }
  
  async update({ id, data }: { id: string; data: Prisma.SupplierUpdateInput }) {
    return await prisma.supplier.update({
      where: { id },
      data,
    })
  }

  async getSupplier() {
    return await prisma.supplier.findMany()
  }
}
