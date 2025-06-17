import { InventoryRepository } from '@/repositories/inventory-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface UpdateInventoryUseCaseRequest {
  id: string
  name?: string
  description?: string
  quantity?: number
  unit?: string
  category_id?: string
}

export class UpdateInventoryUseCase {
  constructor(private inventoryRepository: InventoryRepository) {}

  async execute(data: UpdateInventoryUseCaseRequest) {
    const inventory = await this.inventoryRepository.findById(data.id)

    if (!inventory) {
      throw new ResourceNotFoundError()
    }

    const updatedInventory = await this.inventoryRepository.update(data.id, {
      name: data.name,
      description: data.description,
      quantity: data.quantity,
      unit: data.unit,
      category_id: data.category_id,
    })

    return {
      inventory: updatedInventory,
    }
  }
}
