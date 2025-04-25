import { TransactionRepository } from '@/repositories/transaction-repository'
import { Transaction } from '@prisma/client'

interface CreateTransactionsUseCaseRequest {
  nome: string
  tipo: 'DEBITO' | 'CREDITO'
  valor: number
  conta: string
  conciliado?: boolean
  categoria?: string | null
  date: Date
}

interface CreateTransactionsUseCaseResponse {
  transaction: Transaction
}

export class CreateTransactionsUseCase {
  constructor(private transactionsRepository: TransactionRepository) {}

  async execute({
    conta,
    date,
    nome,
    tipo,
    valor,
    categoria,
    conciliado,
  }: CreateTransactionsUseCaseRequest): Promise<CreateTransactionsUseCaseResponse> {
    const transaction = await this.transactionsRepository.create({
      conta,
      date,
      nome,
      tipo,
      valor,
      categoria: categoria ?? null,
      conciliado: conciliado ?? false,
    })

    return {
      transaction,
    }
  }
}
