import { PrismaSupplierRepository } from '@/repositories/prisma/prisma-supplier-repository'
import { DeleteSupplierUseCase } from '@/use-cases/suppliers/delete-supplier'

export function makeDeleteSupplierUseCase() {
  const supplierRepository = new PrismaSupplierRepository()
  const deleteSupplierUseCase = new DeleteSupplierUseCase(supplierRepository)

  return deleteSupplierUseCase
}
