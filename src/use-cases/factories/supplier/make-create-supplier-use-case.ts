import { PrismaSupplierRepository } from '@/repositories/prisma/prisma-supplier-repository'
import { CreateSupplierUseCase } from '@/use-cases/suppliers/create-supplier'

export function makeCreateSupplierUseCase() {
  const supplierRepository = new PrismaSupplierRepository()
  const createSupplierUseCase = new CreateSupplierUseCase(supplierRepository)
  return createSupplierUseCase
}
