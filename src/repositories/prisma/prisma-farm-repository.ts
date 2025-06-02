import { Prisma } from '@prisma/client'
import { FarmRepository } from '../farm-repository'
import { prisma } from '../../lib/prisma'

export class PrismaFarmRepository implements FarmRepository {
  async create(data: Prisma.FarmCreateInput) {
    return await prisma.farm.create({ data })
  }

  async findById(id: string) {
    return await prisma.farm.findUnique({ where: { id } })
  }

  async update({ id, data }: { id: string; data: Prisma.FarmUpdateInput }) {
    return await prisma.farm.update({
      where: { id },
      data,
    })
  }

  async delete(id: string) {
    await prisma.farm.delete({ where: { id } })
  }

  async getFarmsByProducer(producerId: string, active?: boolean) {
    const where: Prisma.FarmWhereInput = {
      producer_id: producerId,
    }

    if (active !== undefined) {
      where.active = active
    }

    return await prisma.farm.findMany({
      where,
      orderBy: {
        name: 'asc',
      },
    })
  }

  async getAllFarms(active?: boolean) {
    const where: Prisma.FarmWhereInput = {}

    if (active !== undefined) {
      where.active = active
    }

    return await prisma.farm.findMany({
      where,
      include: {
        producer: true,
      },
      orderBy: {
        name: 'asc',
      },
    })
  }
}
