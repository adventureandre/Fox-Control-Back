import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { UnauthorizedError } from '@/use-cases/errors/unauthorized-error'
import { makeDeleteTransactionUseCase } from '@/use-cases/factories/user/make-delete-transaction-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function deleteTransaction(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { id } = request.params as { id: string }

  const userId = request.user.sub

  try {
    const deleteTransactionsUseCase = makeDeleteTransactionUseCase()
    deleteTransactionsUseCase.execute({
      id,
      userId,
    })

    return reply.status(204).send()
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ error: 'Transação não encontrada' })
    }

    if (error instanceof UnauthorizedError) {
      return reply
        .status(403)
        .send({ error: 'Acesso negado: Você nao pode deleta essa Transação' })
    }

    console.error(error)
  }
}
