import { PrismaFarmRepository } from '@/repositories/prisma/prisma-farm-repository'
import { DeleteFarmUseCase } from '@/use-cases/farm/delete-farm'

export function makeDeleteFarmUseCase() {
  const farmRepository = new PrismaFarmRepository()
  const deleteFarmUseCase = new DeleteFarmUseCase(farmRepository)
  return deleteFarmUseCase
}
