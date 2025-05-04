import { Prisma } from '@prisma/client'
import { CategoriesRepository } from '../categories-repository'
import { prisma } from '@/lib/prisma'

export class PrismaCategoriesRepository implements CategoriesRepository {
  async findAll() {
    return await prisma.category.findMany()
  }

  async findById(code: number) {
    return await prisma.category.findUnique({
      where: {
        code,
      },
    })
  }

  async create(data: Prisma.CategoryCreateInput) {
    return await prisma.category.create({
      data,
    })
  }

  async update(params: { code: number; data: Prisma.CategoryCreateInput }) {
    const { code, data } = params
    return await prisma.category.update({
      where: { code },
      data,
    })
  }

  async delete(code: number) {
    return await prisma.category.delete({
      where: { code },
    })
  }
}
