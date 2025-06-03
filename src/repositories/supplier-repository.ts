import { Prisma, Supplier } from '@prisma/client'

export interface SupplierRepository {
  create(data: Prisma.SupplierCreateInput): Promise<Supplier | null>
  findById(id: string): Promise<Supplier | null>
  findByCpf(cpf: string): Promise<Supplier | null>
  update(params: {
    id: string
    data: Prisma.SupplierUpdateInput
  }): Promise<Supplier>
  delete(id: string): Promise<void>
  getSupplier(): Promise<Supplier[] | []>
}
