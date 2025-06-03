import { makeGetSupplierByIdUseCase } from '@/use-cases/factories/supplier/make-get-supplier-by-id-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

export async function getSupplierById(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const paramsSchema = z.object({
    id: z.string().cuid(),
  })

  try {
    const { id } = paramsSchema.parse(request.params)

    const getSupplierByIdUseCase = makeGetSupplierByIdUseCase()
    const { supplier } = await getSupplierByIdUseCase.execute({ id })

    return reply.status(200).send({
      status: 'success',
      data: supplier,
    })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({
        status: 'error',
        message: 'Fornecedor não encontrado.',
      })
    }

    if (error instanceof z.ZodError) {
      return reply.status(400).send({
        status: 'error',
        message: 'Erro de validação.',
        issues: error.errors,
      })
    }

    console.error('Erro ao buscar fornecedor:', error)
    return reply.status(500).send({
      status: 'error',
      message: 'Erro interno do servidor ao buscar o fornecedor.',
    })
  }
}
