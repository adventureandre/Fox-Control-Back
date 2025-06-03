import { PrismaSupplierRepository } from '@/repositories/prisma/prisma-supplier-repository'
import { UpdateSupplierUseCase } from '@/use-cases/suppliers/update-supplier'

export function makeUpdateSupplierUseCase() {
  const supplierRepository = new PrismaSupplierRepository()
  const updateSupplierUseCase = new UpdateSupplierUseCase(supplierRepository)
  return updateSupplierUseCase
}
