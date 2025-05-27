import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeDeleteCustomerUseCase } from '@/use-cases/factories/customer/make-delete-customer-use-case'

export async function deleteCustomer(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const deleteCustomerParamsSchema = z.object({
    id: z.string().cuid(),
  })

  try {
    const { id } = deleteCustomerParamsSchema.parse(request.params)

    const deleteCustomerUseCase = makeDeleteCustomerUseCase()

    await deleteCustomerUseCase.execute({
      id,
    })

    return reply.status(204).send()
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({
        status: 'error',
        message: 'Cliente não encontrado',
      })
    }

    if (error instanceof z.ZodError) {
      return reply.status(400).send({
        status: 'error',
        message: 'ID inválido',
        issues: error.format(),
      })
    }

    console.error('Erro ao deletar cliente:', error)
    return reply.status(500).send({
      status: 'error',
      message: 'Erro interno do servidor',
    })
  }
}
