import { ImmobilizedRepository } from '@/repositories/immobilized-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface DeleteImmobilizedUseCaseRequest {
  id: string
}

export class DeleteImmobilizedUseCase {
  constructor(private immobilizedRepository: ImmobilizedRepository) {}

  async execute({ id }: DeleteImmobilizedUseCaseRequest) {
    const immobilizedExists = await this.immobilizedRepository.findById(id)

    if (!immobilizedExists) {
      throw new ResourceNotFoundError()
    }

    await this.immobilizedRepository.delete(id)
  }
}
