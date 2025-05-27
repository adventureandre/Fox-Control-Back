import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeDeleteSupplierUseCase } from '@/use-cases/factories/supplier/make-delete-supplier-use-case'

export async function deleteSupplier(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const deleteSupplierParamsSchema = z.object({
    id: z.string().cuid(),
  })

  try {
    const { id } = deleteSupplierParamsSchema.parse(request.params)

    const deleteSupplierUseCase = makeDeleteSupplierUseCase()

    await deleteSupplierUseCase.execute({
      id,
    })

    return reply.status(204).send()
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({
        status: 'error',
        message: 'Fornecedor não encontrado',
      })
    }

    if (error instanceof z.ZodError) {
      return reply.status(400).send({
        status: 'error',
        message: 'ID inválido',
        issues: error.format(),
      })
    }

    console.error('Erro ao deletar fornecedor:', error)
    return reply.status(500).send({
      status: 'error',
      message: 'Erro interno do servidor',
    })
  }
}
