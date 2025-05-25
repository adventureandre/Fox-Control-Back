import { SupplierRepository } from '@/repositories/supplier-repository'

interface CreateSupplierUseCaseRequest {
  name: string
  cpf: string
  group?: string
  address?: string
  city?: string
  state?: string
  phone?: string
  email?: string
  stateRegistration?: string
  active?: boolean
}
export class CreateSupplierUseCase {
  constructor(private supplierRepository: SupplierRepository) {}

  async execute(data: CreateSupplierUseCaseRequest) {
    // Validação adicional, se necessário
    if (!data.cpf || !data.name) {
      throw new Error('Os campos cpf e nome são obrigatórios.')
    }

    const Supplier = await this.supplierRepository.create(data)

    return Supplier
  }
}
