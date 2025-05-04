import { PrismaCategoriesRepository } from '@/repositories/prisma/prisma-categories-repository'
import { FetchAllCategories } from '@/use-cases/category/fetch-all-categories'

export function makeFetchAllCategoriesUseCase() {
  const categoriesRepository = new PrismaCategoriesRepository()
  const fetchAllCategoriesUseCase = new FetchAllCategories(categoriesRepository)

  return fetchAllCategoriesUseCase
}
