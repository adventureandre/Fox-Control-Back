import { TransactionRepository } from '@/repositories/transaction-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { Transaction } from '@prisma/client'
import { InvalidParameterError } from '../errors/invalid-parameter-error'

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
  constructor(
    private transactionsRepository: TransactionRepository,
    private userRepository: UsersRepository,
  ) {}

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

    const userExists = await this.userRepository.findById(user_id)
    if (!userExists) {
      throw new Error('Usuário não encontrado.')
    }

    if (!conta || !banco) {
      throw new InvalidParameterError(
        'Os campos conta e banco são obrigatórios.',
      )
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
