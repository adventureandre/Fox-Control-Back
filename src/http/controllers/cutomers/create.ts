import { makeCreateCustomerUseCase } from '@/use-cases/factories/customer/make-create-customer-use-case'
import { makeGetCustomerByCpfUseCase } from '@/use-cases/factories/customer/make-get-customer-by-cpf-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createCustomer(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const schemaCustomer = z.object({
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
    const data = schemaCustomer.parse(request.body)

    console.log('Dados do Clientes:', data)

    const getCustomerByCpfUseCase = makeGetCustomerByCpfUseCase()
    const { customer } = await getCustomerByCpfUseCase.execute({
      cpf: data.cpf,
    })

    if (customer) {
      return reply.status(409).send({
        status: 'error',
        message: 'Já existe um Clientes cadastrado com este CPF.',
      })
    }

    const createCustomerUseCase = makeCreateCustomerUseCase()
    const customerCreate = await createCustomerUseCase.execute(data)

    return reply.status(201).send({
      status: 'success',
      data: customerCreate,
    })
  } catch (error) {
    console.error('Erro ao criar Clientes:', error)
    if (error instanceof z.ZodError) {
      return reply.status(400).send({
        status: 'error',
        message: 'Erro de validação.',
        issues: error.errors,
      })
    }
    return reply.status(500).send({
      status: 'error',
      message: 'Erro ao criar o Clientes.',
    })
  }
}
