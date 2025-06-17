import { PrismaInventoryRepository } from '@/repositories/prisma/prisma-inventory-repository'
import { CreateInventoryUseCase } from '../inventory/create-inventory'

export function makeCreateInventoryUseCase() {
  const inventoryRepository = new PrismaInventoryRepository()
  const useCase = new CreateInventoryUseCase(inventoryRepository)

  return useCase
}
