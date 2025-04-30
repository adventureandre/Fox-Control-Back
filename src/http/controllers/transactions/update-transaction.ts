import { prisma } from '@/lib/prisma'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function updateTransaction(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  // Define o esquema de validação para os dados recebidos
  const updateTransactionSchema = z.object({
    nome: z.string(),
    valor: z.number(),
    date: z.string(),
    tipo: z.enum(['DEBITO', 'CREDITO']),
    categoria: z.string().optional(),
    conciliado: z.boolean().optional(),
    conta: z.string().optional(),
  })

  const { nome, valor, date, tipo, categoria, conciliado, conta } =
    updateTransactionSchema.parse(request.body)

  const { id } = request.params as { id: string }

  try {
    // Verifica se a transação existe antes de atualizar
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
        id,
        nome,
        valor,
        date,
        tipo,
        categoria,
        conciliado,
        conta,
      },
    })

    return reply.status(200).send(transaction)
  } catch (error) {
    console.error('Erro ao atualizar transação:', error)
    return reply.status(500).send({ error: 'Erro ao atualizar transação' })
  }
}
