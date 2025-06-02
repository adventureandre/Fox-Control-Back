import { FarmRepository } from '@/repositories/farm-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface DeleteFarmUseCaseRequest {
  id: string
}

interface DeleteFarmUseCaseResponse {
  success: boolean
}

export class DeleteFarmUseCase {
  constructor(private farmRepository: FarmRepository) {}

  async execute({
    id,
  }: DeleteFarmUseCaseRequest): Promise<DeleteFarmUseCaseResponse> {
    const farm = await this.farmRepository.findById(id)

    if (!farm) {
      throw new ResourceNotFoundError()
    }

    await this.farmRepository.delete(id)

    return { success: true }
  }
}
