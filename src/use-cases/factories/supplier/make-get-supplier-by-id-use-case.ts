import { PrismaSupplierRepository } from '@/repositories/prisma/prisma-supplier-repository'
import { GetSupplierByIdUseCase } from '@/use-cases/suppliers/get-supplier-by-id'

export function makeGetSupplierByIdUseCase() {
  const supplierRepository = new PrismaSupplierRepository()
  const getSupplierByIdUseCase = new GetSupplierByIdUseCase(supplierRepository)
  return getSupplierByIdUseCase
}
