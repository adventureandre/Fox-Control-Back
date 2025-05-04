import { Category, Prisma } from '@prisma/client'

export interface CategoriesRepository {
  findById(id: number): Promise<Category | null>
  create(data: Prisma.CategoryCreateInput): Promise<Category>
  findAll(): Promise<Category[]>
  update(params: {
    id: number
    data: Prisma.CategoryCreateInput
  }): Promise<Category>
  delete(id: number): Promise<void>
}
