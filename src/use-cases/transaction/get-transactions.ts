import { TransactionRepository } from '@/repositories/transaction-repository'

interface GetTransactionsUseCaseRequest {
  page?: number
  limit?: number
}

export class GetTransactionsUseCase {
  constructor(private transactionsRepository: TransactionRepository) {}

  async execute({ page, limit }: GetTransactionsUseCaseRequest) {
    const transactions = await this.transactionsRepository.getTransactions(
      page,
      limit,
    )

    return transactions
  }
}
