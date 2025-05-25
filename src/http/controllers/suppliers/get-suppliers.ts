import { prisma } from '@/lib/prisma'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function getSuppliers(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const suppliers = await prisma.supplier.findMany()

  return reply.status(200).send(suppliers)
}
