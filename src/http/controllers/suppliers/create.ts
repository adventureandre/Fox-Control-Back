import { makeCreateSupplierUseCase } from '@/use-cases/factories/supplier/make-create-supplier-use-case'
import { makeGetSupplierByCpfUseCase } from '@/use-cases/factories/supplier/make-get-supplier-by-cpf-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createSupplier(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const schemaSupplier = z.object({
    name: z.string(),
    cpf: z.string(),
    stateRegistration: z.string().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().optional(),
    active: z.boolean().optional(),
  })

  try {
    const data = schemaSupplier.parse(request.body)

    console.log('Dados do Fornecedor:', data)

    const getSupplierByCpfUseCase = makeGetSupplierByCpfUseCase()
    const { supplier } = await getSupplierByCpfUseCase.execute({
      cpf: data.cpf,
    })

    if (supplier) {
      return reply.status(409).send({
        status: 'error',
        message: 'Já existe um Fornecedor cadastrado com este CPF.',
      })
    }

    const createSupplierUseCase = makeCreateSupplierUseCase()
    const supplierCreate = await createSupplierUseCase.execute(data)

    return reply.status(201).send({
      status: 'success',
      data: supplierCreate,
    })
  } catch (error) {
    console.error('Erro ao criar Fornecedor:', error)
    if (error instanceof z.ZodError) {
      return reply.status(400).send({
        status: 'error',
        message: 'Erro de validação.',
        issues: error.errors,
      })
    }
    return reply.status(500).send({
      status: 'error',
      message: 'Erro ao criar o Fornecedor.',
    })
  }
}
