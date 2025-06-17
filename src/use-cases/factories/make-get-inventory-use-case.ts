import { PrismaInventoryRepository } from '@/repositories/prisma/prisma-inventory-repository'
import { GetInventoryUseCase } from '../inventory/get-inventory'

export function makeGetInventoryUseCase() {
  const inventoryRepository = new PrismaInventoryRepository()
  const useCase = new GetInventoryUseCase(inventoryRepository)

  return useCase
}
