import { prisma } from '@/lib/prisma'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getTransactions(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const paginationSchema = z.object({
    page: z.coerce.number().min(1).optional(),
    limit: z.coerce.number().min(1).max(100).optional(),
  })

  const { page, limit } = paginationSchema.parse(request.query)

  const transactions = await prisma.transaction.findMany({
    skip: page && limit ? (page - 1) * limit : undefined,
    take: limit || undefined,
    orderBy: {
      date: 'desc',
    },
  })

  return reply.status(200).send(transactions)
}
