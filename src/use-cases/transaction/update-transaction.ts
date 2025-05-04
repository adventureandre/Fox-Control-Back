import { prisma } from '@/lib/prisma'
import { TransactionRepository } from '@/repositories/transaction-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
interface UpdateTransactionUseCaseRequest {
  id: string
  nome: string
  valor: number
  date: Date
  tipo: 'entrada' | 'saida'
  categoria?: string | null
  conciliado?: boolean
  conta?: string
  imported?: boolean
  confirmed?: boolean
}

export class UpdateTransactionUseCase {
  constructor(private transactionsRepository: TransactionRepository) {}

  async execute({
    id,
    nome,
    date,
    tipo,
    valor,
    categoria,
    conciliado,
    confirmed,
    conta,
    imported,
  }: UpdateTransactionUseCaseRequest) {
    try {
      const existingTransaction = await prisma.transaction.findUnique({
        where: { id },
      })

      if (!existingTransaction) {
        throw new ResourceNotFoundError()
      }

      const transaction = await prisma.transaction.update({
        where: {
          id,
        },
        data: {
          nome,
          valor,
          date,
          tipo,
          categoria,
          confirmed,
          imported,
          conta: conta ?? 'manual',
          conciliado: !!conciliado,
        },
      })

      return transaction
    } catch (error) {
      console.error('Erro ao atualizar transação:', error)
    }
  }
}
