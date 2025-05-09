import { makeGetTransactionsUseCase } from '@/use-cases/factories/transaction/make-get-transactions-use-case'
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

  try {
    const getTransactionsUseCase = makeGetTransactionsUseCase()
    const transactions = await getTransactionsUseCase.execute({ page, limit })
    return reply.status(200).send(transactions)
  } catch (error) {
    console.error('Erro inesperado ao buscar transações:', error)
    return reply.status(500).send({ error: 'Erro interno do servidor' })
  }
}
