import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeGetImmobilizedUseCase } from '@/use-cases/factories/immobilized/make-get-immobilized-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getImmobilized(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getImmobilizedParamsSchema = z.object({
    id: z.string(),
  })

  const { id } = getImmobilizedParamsSchema.parse(request.params)

  try {
    const getImmobilizedUseCase = makeGetImmobilizedUseCase()
    const { immobilized } = await getImmobilizedUseCase.execute({
      id,
    })

    return reply.status(200).send({
      status: 'success',
      data: immobilized,
    })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({
        status: 'error',
        message: 'Bem imobilizado não encontrado.',
      })
    }

    console.error('Erro ao buscar bem imobilizado:', error)
    return reply.status(500).send({
      status: 'error',
      message: 'Erro ao buscar o bem imobilizado.',
    })
  }
}
