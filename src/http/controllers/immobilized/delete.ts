import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeDeleteImmobilizedUseCase } from '@/use-cases/factories/immobilized/make-delete-immobilized-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function deleteImmobilized(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const deleteImmobilizedParamsSchema = z.object({
    id: z.string(),
  })

  const { id } = deleteImmobilizedParamsSchema.parse(request.params)

  try {
    const deleteImmobilizedUseCase = makeDeleteImmobilizedUseCase()
    await deleteImmobilizedUseCase.execute({
      id,
    })

    return reply.status(204).send()
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({
        status: 'error',
        message: 'Bem imobilizado não encontrado.',
      })
    }

    console.error('Erro ao deletar bem imobilizado:', error)
    return reply.status(500).send({
      status: 'error',
      message: 'Erro ao deletar o bem imobilizado.',
    })
  }
}
