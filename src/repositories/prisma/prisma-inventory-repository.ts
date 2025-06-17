import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { InventoryRepository } from '../inventory-repository'

export class PrismaInventoryRepository implements InventoryRepository {
  async create(data: Prisma.InventoryCreateInput) {
    const inventory = await prisma.inventory.create({
      data,
    })

    return inventory
  }

  async findById(id: string) {
    const inventory = await prisma.inventory.findUnique({
      where: {
        id,
      },
    })

    return inventory
  }

  async findInventoryByProducer(producerId: string) {
    const inventory = await prisma.inventory.findFirst({
      where: {
        producer_id: producerId,
      },
    })

    return inventory
  }

  async findMany(producerId?: string) {
    const inventory = await prisma.inventory.findMany({
      where: producerId ? { producer_id: producerId } : undefined,
      include: {
        producer: true,
      },
    })

    return inventory
  }

  async update(id: string, data: Prisma.InventoryUpdateInput) {
    const inventory = await prisma.inventory.update({
      where: {
        id,
      },
      data,
    })

    return inventory
  }

  async delete(id: string) {
    await prisma.inventory.delete({
      where: {
        id,
      },
    })
  }
}
