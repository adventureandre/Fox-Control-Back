import { TransactionRepository } from '@/repositories/transaction-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { UnauthorizedError } from '../errors/unauthorized-error'

interface DeleteTransactionsUseCaseRequest {
  id: string
  userId: string
}

export class DeleteTransactionsUseCase {
  constructor(private transactionRepository: TransactionRepository) {}

  async execute({ id, userId }: DeleteTransactionsUseCaseRequest) {
    const transaction = await this.transactionRepository.findById(id)

    if (!transaction) {
      throw new ResourceNotFoundError()
    }

    if (transaction.user_id !== userId) {
      throw new UnauthorizedError()
    }

    try {
      await this.transactionRepository.delete(id)
    } catch (error) {
      console.error('Erro ao deletar transação:', error)
      throw error
    }
  }
}
