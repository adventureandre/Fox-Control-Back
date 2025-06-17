import { InventoryRepository } from '@/repositories/inventory-repository'

interface CreateInventoryUseCaseRequest {
  crop: string
  quantity: number
  average_price?: number
  estimated_value?: number
  producer_id: string
  active?: boolean
}

export class CreateInventoryUseCase {
  constructor(private inventoryRepository: InventoryRepository) {}

  async execute(data: CreateInventoryUseCaseRequest) {
    // Validação adicional, se necessário
    if (!data.crop || !data.quantity) {
      throw new Error('Nome e quantidade são campos obrigatórios.')
    }

    const inventory = await this.inventoryRepository.create({
      crop: data.crop,
      average_price: data.average_price || 0,
      estimated_value: data.estimated_value || 0,
      quantity: data.quantity,
      active: data.active ?? true,

      producer: {
        connect: {
          id: data.producer_id,
        },
      },
    })

    return inventory
  }
}
