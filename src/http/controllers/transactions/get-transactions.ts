import { prisma } from '@/lib/prisma'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getTransactions(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const paginationSchema = z.object({
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(100).default(20),
  })

  const { page, limit } = paginationSchema.parse(request.query)

  const transactions = await prisma.transaction.findMany({
    skip: (page - 1) * limit,
    take: limit,
    orderBy: {
      date: 'desc',
    },
  })

  return reply.status(200).send({ transactions })
}
