import { Prisma } from '@prisma/client'
import { ImmobilizedRepository } from '@/repositories/immobilized-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface UpdateImmobilizedUseCaseRequest {
  id: string
  name?: string
  currentValue?: number
  estimatedValue?: number
  status?: string
  avaliableAsCollateral?: boolean
  depreciationRate?: number
  acquisitionDate?: Date
  usefulLifeYears?: number
  notes?: string
  active?: boolean
}

export class UpdateImmobilizedUseCase {
  constructor(private immobilizedRepository: ImmobilizedRepository) {}

  async execute({ id, ...data }: UpdateImmobilizedUseCaseRequest) {
    const immobilizedExists = await this.immobilizedRepository.findById(id)

    if (!immobilizedExists) {
      throw new ResourceNotFoundError()
    }

    const immobilized = await this.immobilizedRepository.update({
      id,
      data: {
        ...data,
      },
    })

    return {
      immobilized,
    }
  }
}
