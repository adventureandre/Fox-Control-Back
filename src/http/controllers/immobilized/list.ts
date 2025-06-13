import { makeListImmobilizedUseCase } from '@/use-cases/factories/immobilized/make-list-immobilized-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function listImmobilized(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const listImmobilizedQuerySchema = z.object({
    producerId: z.string().optional(),
  })

  const { producerId } = listImmobilizedQuerySchema.parse(request.query)

  try {
    const listImmobilizedUseCase = makeListImmobilizedUseCase()
    const { immobilized } = await listImmobilizedUseCase.execute({
      producerId,
    })

    return reply.status(200).send({
      status: 'success',
      data: immobilized,
    })
  } catch (error) {
    console.error('Erro ao listar bens imobilizados:', error)
    return reply.status(500).send({
      status: 'error',
      message: 'Erro ao listar os bens imobilizados.',
    })
  }
}
