import { SupplierRepository } from '@/repositories/supplier-repository'
import { Supplier } from '@prisma/client'

interface GetSupplierByCpfUseCaseRequest {
  cpf: string
}

interface GetSupplierByCpfUseCaseResponse {
  supplier: Supplier | null
}

export class GetSupplierByCpfUseCase {
  constructor(private supplierRepository: SupplierRepository) {}

  async execute({
    cpf,
  }: GetSupplierByCpfUseCaseRequest): Promise<GetSupplierByCpfUseCaseResponse> {
    const supplier = await this.supplierRepository.findByCpf(cpf)

    return { supplier }
  }
}
