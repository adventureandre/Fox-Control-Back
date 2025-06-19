import { InventoryRepository } from '@/repositories/inventory-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { Inventory } from '@prisma/client'

interface UpdateInventoryUseCaseRequest {
  crop?: string
  quantity?: number
  average_price?: number
  estimated_value?: number
  producer_id?: string
  active?: boolean
  id: string
}

interface UpdateInventoryUseCaseResponse {
  inventory: Inventory
}
export class UpdateInventoryUseCase {
  constructor(private inventoryRepository: InventoryRepository) {}

  async execute(
    data: UpdateInventoryUseCaseRequest,
  ): Promise<UpdateInventoryUseCaseResponse> {
    const inventory = await this.inventoryRepository.findById(data.id)

    if (!inventory) {
      throw new ResourceNotFoundError()
    }

    const updatedInventory = await this.inventoryRepository.update(
      data.id,
      data,
    )

    return {
      inventory: updatedInventory,
    }
  }
}
