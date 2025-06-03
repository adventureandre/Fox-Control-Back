import { SupplierRepository } from '@/repositories/supplier-repository'
import { Supplier } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface GetSupplierByIdUseCaseRequest {
  id: string
}

interface GetSupplierByIdUseCaseResponse {
  supplier: Supplier
}

export class GetSupplierByIdUseCase {
  constructor(private supplierRepository: SupplierRepository) {}

  async execute({
    id,
  }: GetSupplierByIdUseCaseRequest): Promise<GetSupplierByIdUseCaseResponse> {
    const supplier = await this.supplierRepository.findById(id)

    if (!supplier) {
      throw new ResourceNotFoundError()
    }

    return { supplier }
  }
}
