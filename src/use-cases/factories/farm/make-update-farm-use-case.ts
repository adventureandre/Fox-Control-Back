import { PrismaFarmRepository } from '@/repositories/prisma/prisma-farm-repository'
import { UpdateFarmUseCase } from '@/use-cases/farm/update-farm'

export function makeUpdateFarmUseCase() {
  const farmRepository = new PrismaFarmRepository()
  const updateFarmUseCase = new UpdateFarmUseCase(farmRepository)
  return updateFarmUseCase
}
