import { CategoriesRepository } from '@/repositories/categories-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

export class FetchAllCategories {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async execute() {
    const categories = await this.categoriesRepository.findAll()

    if (!categories) {
      throw new ResourceNotFoundError()
    }

    return categories
  }
}
