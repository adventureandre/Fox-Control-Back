import { makeGetFarmsByProducerUseCase } from '@/use-cases/factories/farm/make-get-farms-by-producer-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

export async function getFarmsByProducer(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const paramsSchema = z.object({
    producerId: z.string().cuid(),
  })

  const querySchema = z.object({
    active: z.enum(['true', 'false']).optional(),
  })

  try {
    const { producerId } = paramsSchema.parse(request.params)
    const query = querySchema.parse(request.query)

    let active: boolean | undefined
    if (query.active !== undefined) {
      active = query.active === 'true'
    }

    const getFarmsByProducerUseCase = makeGetFarmsByProducerUseCase()
    const { farms } = await getFarmsByProducerUseCase.execute({
      producerId,
      active,
    })

    return reply.status(200).send({
      status: 'success',
      data: farms,
    })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({
        status: 'error',
        message: 'Produtor não encontrado.',
      })
    }

    if (error instanceof z.ZodError) {
      return reply.status(400).send({
        status: 'error',
        message: 'Erro de validação.',
        issues: error.errors,
      })
    }

    console.error('Erro ao buscar fazendas do produtor:', error)
    return reply.status(500).send({
      status: 'error',
      message: 'Erro interno do servidor ao buscar fazendas.',
    })
  }
}
