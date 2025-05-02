import { prisma } from '@/lib/prisma'
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
    tipo: z.enum(['entrada', 'saida']),
    categoria: z.string().nullable().optional(),
    conciliado: z.boolean().optional(),
    conta: z.string().optional(),
  })

  const { nome, valor, date, tipo, categoria, conciliado, conta } =
    updateTransactionSchema.parse(request.body)

  const { id } = request.params as { id: string }

  try {
    const existingTransaction = await prisma.transaction.findUnique({
      where: { id },
    })

    if (!existingTransaction) {
      return reply.status(404).send({ error: 'Transação não encontrada' })
    }

    const transaction = await prisma.transaction.update({
      where: {
        id,
      },
      data: {
        nome,
        valor,
        date,
        tipo,
        categoria,
        conta: conta ?? 'manual',
        conciliado: !!conciliado,
      },
    })

    return reply.status(200).send(transaction)
  } catch (error) {
    console.error('Erro ao atualizar transação:', error)
    return reply.status(500).send({ error: 'Erro ao atualizar transação' })
  }
}
