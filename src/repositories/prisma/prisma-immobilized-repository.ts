import { Prisma } from '@prisma/client'
import { ImmobilizedRepository } from '../immobilized-repository'
import { prisma } from '@/lib/prisma'

export class PrismaImmobilizedRepository implements ImmobilizedRepository {
  async findById(id: string) {
    return await prisma.immobilized.findUnique({ where: { id } })
  }

  async findByUserProducer(producerId: string) {
    return await prisma.immobilized.findFirst({
      where: { producer_id: producerId },
    })
  }

  async findMany(producerId?: string) {
    return await prisma.immobilized.findMany({
      where: producerId ? { producer_id: producerId } : undefined,
      include: {
        producer: true,
      },
    })
  }

  async create(data: Prisma.ImmobilizedCreateInput) {
    return await prisma.immobilized.create({ data })
  }

  async update({
    id,
    data,
  }: {
    id: string
    data: Prisma.ImmobilizedUpdateInput
  }) {
    return await prisma.immobilized.update({
      where: { id },
      data,
    })
  }

  async delete(id: string) {
    await prisma.immobilized.delete({ where: { id } })
  }
}
