import { TransactionRepository } from '@/repositories/transaction-repository'
import { Transaction } from '@prisma/client'

interface CreateTransactionsUseCaseRequest {
  nome: string
  valor: number
  date: Date
  categoria?: number | null
  conciliado?: boolean
  conta: string
  tipo?: string | null
  banco?: string | null
  user_id: string
  imported?: boolean
  confirmed?: boolean
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
    valor,
    categoria,
    conciliado,
    tipo,
    banco,
    user_id,
    imported,
    confirmed,
  }: CreateTransactionsUseCaseRequest): Promise<CreateTransactionsUseCaseResponse> {
    const transaction = await this.transactionsRepository.create({
      conta,
      date,
      nome,
      valor,
      categoria: categoria ?? null,
      conciliado: conciliado ?? false,
      tipo,
      banco,
      user_id,
      imported,
      confirmed,
    })

    return {
      transaction,
    }
  }
}
