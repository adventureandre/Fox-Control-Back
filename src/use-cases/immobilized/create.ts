import { ImmobilizedRepository } from '@/repositories/immobilized-repository'

interface CreateImmobilizedUseCaseRequest {
  name: string
  currentValue: number
  estimatedValue: number
  status: string
  avaliableAsCollateral?: boolean
  depreciationRate?: number
  acquisitionDate: Date
  usefulLifeYears?: number
  notes?: string
  producer_id: string
  active?: boolean
}

export class CreateImmobilizedUseCase {
  constructor(private immobilizedRepository: ImmobilizedRepository) {}

  async execute(data: CreateImmobilizedUseCaseRequest) {
    const immobilized = await this.immobilizedRepository.create({
      name: data.name,
      currentValue: data.currentValue,
      estimatedValue: data.estimatedValue,
      status: data.status,
      avaliableAsCollateral: data.avaliableAsCollateral ?? false,
      depreciationRate: data.depreciationRate ?? 0,
      acquisitionDate: data.acquisitionDate,
      usefulLifeYears: data.usefulLifeYears ?? 0,
      notes: data.notes ?? '',
      producer: { connect: { id: data.producer_id } },
      active: data.active ?? true,
    })

    if (!immobilized) {
      throw new Error('Erro ao criar o bem imobilizado.')
    }
    return immobilized
  }
}
