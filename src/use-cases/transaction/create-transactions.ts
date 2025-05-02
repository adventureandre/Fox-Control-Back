import { TransactionRepository } from '@/repositories/transaction-repository'
import { Transaction } from '@prisma/client'

interface CreateTransactionsUseCaseRequest {
  nome: string
  valor: number
  date: string
  tipo: 'entrada' | 'saida'
  categoria?: string | null
  conciliado?: boolean
  conta: string
  user_id: string
  imported?: boolean
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
    user_id,
    imported,
  }: CreateTransactionsUseCaseRequest): Promise<CreateTransactionsUseCaseResponse> {
    const transaction = await this.transactionsRepository.create({
      user_id,
      imported,
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
