import { CategoriesRepository } from '@/repositories/categories-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface GetCategoryUseCaseRequest {
  code: number
}

export class GetCategoryUseCase {
  constructor(private categoryRepository: CategoriesRepository) {}

  async execute({ code }: GetCategoryUseCaseRequest) {
    const category = await this.categoryRepository.findById(code)

    if (!category) {
      throw new ResourceNotFoundError()
    }

    return category
  }
}
