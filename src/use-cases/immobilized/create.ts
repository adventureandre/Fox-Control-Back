import { ImmobilizedRepository } from '@/repositories/immobilized-repository'

interface CreateImmobilizedUseCaseRequest {
  name: string
  currentValue: number
  status: string
  owner?: string
  type?: string
  avaliableAsCollateral?: boolean
  depreciationRate?: number
  notes?: string
  manufactureYear?: number
  manufacturer?: string
  producer_id: string
  active?: boolean
  usefulLifeYears?: number
}

export class CreateImmobilizedUseCase {
  constructor(private immobilizedRepository: ImmobilizedRepository) {}

  async execute(data: CreateImmobilizedUseCaseRequest) {
    const immobilized = await this.immobilizedRepository.create({
      name: data.name,
      currentValue: data.currentValue,
      status: data.status,
      avaliableAsCollateral: data.avaliableAsCollateral ?? false,
      depreciationRate: data.depreciationRate ?? 0,
      owner: data.owner ?? '',
      type: data.type ?? '',
      manufactureYear: data.manufactureYear ?? null,
      manufacturer: data.manufacturer ?? '',
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
