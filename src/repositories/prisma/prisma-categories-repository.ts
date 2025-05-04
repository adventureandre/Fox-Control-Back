import { PrismaClient, Prisma } from '@prisma/client'
import { CategoriesRepository } from '../categories-repository'

const prisma = new PrismaClient()

export class PrismaCategoriesRepository implements CategoriesRepository {
  async findAll() {
    return prisma.category.findMany()
  }

  async findById(id: number) {
    return prisma.category.findUnique({
      where: { id },
    })
  }

  async create(data: Prisma.CategoryCreateInput) {
    return prisma.category.create({
      data,
    })
  }

  async update(params: { id: number; data: Prisma.CategoryCreateInput }) {
    const { id, data } = params
    return prisma.category.update({
      where: { id },
      data,
    })
  }

  async delete(id: number) {
    await prisma.category.delete({
      where: { id },
    })
  }
}
