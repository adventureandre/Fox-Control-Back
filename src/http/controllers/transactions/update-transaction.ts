import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeUpdateTransactionUseCase } from '@/use-cases/factories/transaction/make-update-transaction-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function updateTransaction(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const updateTransactionSchema = z.object({
    nome: z.string(),
    valor: z.union([
      z.string().transform((val) => parseFloat(parseFloat(val).toFixed(2))),
      z.number().transform((val) => parseFloat(val.toFixed(2))),
    ]),
    date: z.string().transform((val) => {
      if (val.includes('T')) {
        return new Date(val)
      }
      return new Date(`${val}T00:00:00.000Z`)
    }),
    categoria: z.number().nullable().optional(),
    conciliado: z.boolean().optional(),
    conta: z.string().optional(),
    confirmed: z.boolean().optional(),
    imported: z.boolean().optional(),
    producer_id: z.string().optional(),
  })

  const {
    nome,
    valor,
    date,
    categoria,
    conciliado,
    conta,
    confirmed,
    imported,
    producer_id,
  } = updateTransactionSchema.parse(request.body)

  const { id } = request.params as { id: string }

  try {
    const updateTransactionUseCase = makeUpdateTransactionUseCase()
    const transaction = await updateTransactionUseCase.execute({
      id,
      nome,
      valor,
      date,
      categoria,
      conciliado,
      conta,
      confirmed,
      imported,
      producer_id,
    })

    return reply.status(200).send(transaction)
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ error: 'Transação não encontrada' })
    }

    console.error('Erro ao atualizar transação:', error)
    return reply.status(500).send({ error: 'Erro ao atualizar transação' })
  }
}
