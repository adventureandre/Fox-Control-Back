import { prisma } from '@/lib/prisma'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function getProducers(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const producers = await prisma.producers.findMany()

  return reply.status(200).send(producers)
}
