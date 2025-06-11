import { ImmobilizedRepository } from '@/repositories/immobilized-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface GetImmobilizedUseCaseRequest {
  id: string
}

export class GetImmobilizedUseCase {
  constructor(private immobilizedRepository: ImmobilizedRepository) {}

  async execute({ id }: GetImmobilizedUseCaseRequest) {
    const immobilized = await this.immobilizedRepository.findById(id)

    if (!immobilized) {
      throw new ResourceNotFoundError()
    }

    return {
      immobilized,
    }
  }
}
