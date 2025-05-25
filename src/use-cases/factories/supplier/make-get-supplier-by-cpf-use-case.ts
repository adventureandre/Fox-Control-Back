import { PrismaSupplierRepository } from '@/repositories/prisma/prisma-supplier-repository'
import { GetSupplierByCpfUseCase } from '@/use-cases/suppliers/get-supplier-by-cpf'

export function makeGetSupplierByCpfUseCase() {
  const supplierRepository = new PrismaSupplierRepository()
  const getSupplierByCpfUseCase = new GetSupplierByCpfUseCase(
    supplierRepository,
  )
  return getSupplierByCpfUseCase
}
