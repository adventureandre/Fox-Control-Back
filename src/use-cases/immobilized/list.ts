import { ImmobilizedRepository } from '@/repositories/immobilized-repository'

interface ListImmobilizedUseCaseRequest {
  producerId?: string
}

export class ListImmobilizedUseCase {
  constructor(private immobilizedRepository: ImmobilizedRepository) {}

  async execute({ producerId }: ListImmobilizedUseCaseRequest) {
    const immobilized = await this.immobilizedRepository.findMany(producerId)

    return {
      immobilized,
    }
  }
}
