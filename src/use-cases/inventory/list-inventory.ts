import { InventoryRepository } from '@/repositories/inventory-repository'

interface ListInventoryUseCaseRequest {
  producerId?: string
}

export class ListInventoryUseCase {
  constructor(private inventoryRepository: InventoryRepository) {}

  async execute({ producerId }: ListInventoryUseCaseRequest) {
    const inventories = await this.inventoryRepository.findMany(producerId)

    return {
      inventories,
    }
  }
}
