import { InventoryRepository } from '@/repositories/inventory-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface GetInventoryUseCaseRequest {
  id: string
}

export class GetInventoryUseCase {
  constructor(private inventoryRepository: InventoryRepository) {}

  async execute({ id }: GetInventoryUseCaseRequest) {
    const inventory = await this.inventoryRepository.findById(id)

    if (!inventory) {
      throw new ResourceNotFoundError()
    }

    return {
      inventory,
    }
  }
}
