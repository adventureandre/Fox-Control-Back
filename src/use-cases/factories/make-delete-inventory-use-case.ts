import { PrismaInventoryRepository } from '@/repositories/prisma/prisma-inventory-repository'
import { DeleteInventoryUseCase } from '../inventory/delete-inventory'

export function makeDeleteInventoryUseCase() {
  const inventoryRepository = new PrismaInventoryRepository()
  const useCase = new DeleteInventoryUseCase(inventoryRepository)

  return useCase
}
