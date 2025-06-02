import { prisma } from '@/lib/prisma'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getFarmById(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const paramsSchema = z.object({
    id: z.string().cuid(),
  })

  const { id } = paramsSchema.parse(request.params)

  const farm = await prisma.farm.findUnique({
    where: {
      id,
    },
    include: {
      producer: true,
    },
  })

  if (!farm) {
    return reply.status(404).send({
      status: 'error',
      message: 'Fazenda não encontrada.',
    })
  }

  return reply.status(200).send({
    status: 'success',
    data: farm,
  })
}
