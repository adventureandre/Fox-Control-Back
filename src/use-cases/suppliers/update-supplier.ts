import { SupplierRepository } from '@/repositories/supplier-repository'
import { Supplier } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface UpdateSupplierUseCaseRequest {
  id: string
  name?: string
  cpf?: string
  phone?: string
  email?: string
  address?: string
  stateRegistration?: string
  city?: string
  state?: string
  active?: boolean
}

interface UpdateSupplierUseCaseResponse {
  supplier: Supplier
}

export class UpdateSupplierUseCase {
  constructor(private supplierRepository: SupplierRepository) {}

  async execute({
    id,
    name,
    cpf,
    phone,
    email,
    address,
    stateRegistration,
    city,
    state,
    active,
  }: UpdateSupplierUseCaseRequest): Promise<UpdateSupplierUseCaseResponse> {
    const supplier = await this.supplierRepository.findById(id)

    if (!supplier) {
      throw new ResourceNotFoundError()
    }

    // Se tiver CPF e for diferente do atual, é necessário verificar se já existe outro fornecedor com esse CPF
    if (cpf && cpf !== supplier.cpf) {
      const supplierWithSameCpf = await this.supplierRepository.findByCpf(cpf)
      if (supplierWithSameCpf && supplierWithSameCpf.id !== id) {
        throw new Error('Já existe um fornecedor com esse CPF cadastrado')
      }
    }

    const updatedSupplier = await this.supplierRepository.update({
      id,
      data: {
        name,
        cpf,
        phone,
        email,
        address,
        stateRegistration,
        city,
        state,
        active,
      },
    })

    return { supplier: updatedSupplier }
  }
}
