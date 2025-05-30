import { Prisma } from '@prisma/client'
import { ProducerRepository } from '../producer-repository'
import { prisma } from '../../lib/prisma'

export class PrismaProducersRepository implements ProducerRepository {
  async create(data: Prisma.ProducersCreateInput) {
    return await prisma.producers.create({ data })
  }

  async findById(id: string) {
    return await prisma.producers.findUnique({ where: { id } })
  }

  async findByCpf(cpf: string) {
    return await prisma.producers.findUnique({ where: { cpf } })
  }

  async delete(id: string) {
    await prisma.producers.delete({ where: { id } })
  }

  async getProducers() {
    return await prisma.producers.findMany()
  }

  async update({
    id,
    data,
  }: {
    id: string
    data: Prisma.ProducersUpdateInput
  }) {
    return await prisma.producers.update({
      where: { id },
      data,
    })
  }
}
