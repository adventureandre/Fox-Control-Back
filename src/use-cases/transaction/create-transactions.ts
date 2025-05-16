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
  producer_id?: string
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
    producer_id,
    confirmed,
  }: CreateTransactionsUseCaseRequest): Promise<CreateTransactionsUseCaseResponse> {
    // Validação adicional, se necessário
    if (!conta || !banco) {
      throw new Error('Os campos conta e banco são obrigatórios.')
    }

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
      producer_id,
      confirmed,
    })

    return {
      transaction,
    }
  }
}
