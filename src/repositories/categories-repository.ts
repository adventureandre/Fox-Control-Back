import { Category, Prisma } from '@prisma/client'

export interface CategoriesRepository {
  findById(code: number): Promise<Category | null>
  create(data: Prisma.CategoryCreateInput): Promise<Category>
  findAll(): Promise<Category[]>
  update(params: {
    code: number
    data: Prisma.CategoryCreateInput
  }): Promise<Category>
  delete(code: number): Promise<Category>
}
