import { PrismaInventoryRepository } from '@/repositories/prisma/prisma-inventory-repository'
import { UpdateInventoryUseCase } from '../inventory/update-inventory'

export function makeUpdateInventoryUseCase() {
  const inventoryRepository = new PrismaInventoryRepository()
  const useCase = new UpdateInventoryUseCase(inventoryRepository)

  return useCase
}
