import { prisma } from '@/lib/prisma'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getProducerById(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const paramsSchema = z.object({
    id: z.string().cuid(),
  })

  const { id } = paramsSchema.parse(request.params)

  const producer = await prisma.producers.findUnique({
    where: {
      id,
    },
  })

  if (!producer) {
    return reply.status(404).send({
      status: 'error',
      message: 'Produtor nao encontrado.',
    })
  }

  return reply.status(200).send({
    status: 'success',
    data: producer,
  })
}
