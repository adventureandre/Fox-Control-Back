import { SupplierRepository } from '@/repositories/supplier-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface DeleteSupplierUseCaseRequest {
  id: string
}

export class DeleteSupplierUseCase {
  constructor(private supplierRepository: SupplierRepository) {}

  async execute({ id }: DeleteSupplierUseCaseRequest) {
    const supplier = await this.supplierRepository.findById(id)

    if (!supplier) {
      throw new ResourceNotFoundError()
    }

    await this.supplierRepository.delete(id)

    return { supplier }
  }
}
