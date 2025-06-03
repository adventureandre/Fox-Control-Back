import { makeUpdateCustomerUseCase } from '@/use-cases/factories/customer/make-update-customer-use-case'
import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function updateCustomer(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const paramsSchema = z.object({
    id: z.string().cuid(),
  })

  const bodySchema = z.object({
    name: z.string().optional(),
    cpf: z.string().optional(),
    stateRegistration: z.string().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().optional(),
    active: z.boolean().optional(),
  })

  try {
    const { id } = paramsSchema.parse(request.params)
    const data = bodySchema.parse(request.body)

    const updateCustomerUseCase = makeUpdateCustomerUseCase()
    const result = await updateCustomerUseCase.execute({ id, data })

    return reply.status(200).send({ status: 'success', data: result.customer })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply.status(400).send({
        status: 'error',
        message: 'Dados inválidos',
        issues: error.format(),
      })
    }
    if (error instanceof Error && error.message === 'Cliente não encontrado') {
      return reply.status(404).send({ status: 'error', message: error.message })
    }
    console.error('Erro ao atualizar cliente:', error)
    return reply
      .status(500)
      .send({ status: 'error', message: 'Erro interno do servidor' })
  }
}
