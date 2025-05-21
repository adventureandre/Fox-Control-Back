import { FastifyReply, FastifyRequest } from 'fastify'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { UnauthorizedError } from '@/use-cases/errors/unauthorized-error'
import { makeDeleteTransactionUseCase } from '@/use-cases/factories/user/make-delete-transaction-use-case'

export async function deleteTransaction(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const userId = request.user.sub

  const { ids } = request.body as { ids: string[] }

  try {
    const deleteTransactionsUseCase = makeDeleteTransactionUseCase()

    if (ids && Array.isArray(ids)) {
      for (const id of ids) {
        await deleteTransactionsUseCase.execute({ id, userId })
      }
    } else {
      return reply.status(400).send({ error: 'Nenhum ID válido fornecido' })
    }

    return reply.status(204).send()
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ error: 'Transação não encontrada' })
    }

    if (error instanceof UnauthorizedError) {
      return reply.status(403).send({ error: 'Acesso não autorizado' })
    }

    console.error('Erro inesperado ao deletar transação:', error)
    return reply.status(500).send({ error: 'Erro interno do servidor' })
  }
}
