import { prisma } from '@/lib/prisma'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function createProducer(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { name, cpf } = request.body as {
    name: string
    cpf: string
  }

  const producer = await prisma.producers.create({
    data: {
      name,
      cpf,
    },
  })

  return reply.status(201).send({
    status: 'success',
    data: producer,
  })
}
