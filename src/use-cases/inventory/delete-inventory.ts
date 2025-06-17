import { InventoryRepository } from '@/repositories/inventory-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface DeleteInventoryUseCaseRequest {
  id: string
}

export class DeleteInventoryUseCase {
  constructor(private inventoryRepository: InventoryRepository) {}

  async execute({ id }: DeleteInventoryUseCaseRequest): Promise<void> {
    const inventory = await this.inventoryRepository.findById(id)

    if (!inventory) {
      throw new ResourceNotFoundError()
    }

    await this.inventoryRepository.delete(id)
  }
}
