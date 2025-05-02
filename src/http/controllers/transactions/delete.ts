import { prisma } from '@/lib/prisma'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function deleteTransaction(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { id } = request.params as { id: string }

  const userId = request.user.sub

  try {
    // Verifica se a transação existe
    const transaction = await prisma.transaction.findUnique({
      where: { id },
    })

    if (!transaction) {
      return reply.status(404).send({ error: 'Transação não encontrada' })
    }

    // Verifica se a transação pertence ao usuário
    if (transaction.user_id !== userId) {
      return reply
        .status(403)
        .send({ error: 'Acesso negado: Você nao pode deleta essa Transação' })
    }

    // Deleta a transação
    await prisma.transaction.delete({
      where: { id },
    })

    return reply.status(204).send()
  } catch (error) {
    console.error(error)
  }
}
