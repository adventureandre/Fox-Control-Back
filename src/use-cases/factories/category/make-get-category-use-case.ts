import { PrismaCategoriesRepository } from '@/repositories/prisma/prisma-categories-repository'
import { GetCategoryUseCase } from '@/use-cases/category/get-category'

export function makeGetCategoryUseCase() {
  const categoryRepository = new PrismaCategoriesRepository()
  const getCategoryUseCase = new GetCategoryUseCase(categoryRepository)
  return getCategoryUseCase
}
