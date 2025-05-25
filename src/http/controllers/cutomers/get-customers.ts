import { prisma } from '@/lib/prisma'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function getCustomers(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const customers = await prisma.customer.findMany()

  return reply.status(200).send(customers)
}
