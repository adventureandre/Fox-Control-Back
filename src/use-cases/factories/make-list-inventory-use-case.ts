import { PrismaInventoryRepository } from '@/repositories/prisma/prisma-inventory-repository'
import { ListInventoryUseCase } from '../inventory/list-inventory'

export function makeListInventoryUseCase() {
  const inventoryRepository = new PrismaInventoryRepository()
  const useCase = new ListInventoryUseCase(inventoryRepository)

  return useCase
}
