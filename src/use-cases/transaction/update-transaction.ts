import { TransactionRepository } from '@/repositories/transaction-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
interface UpdateTransactionUseCaseRequest {
  id: string
  nome: string
  valor: number
  date: Date
  categoria?: number | null
  conciliado?: boolean
  conta?: string
  safra?: string
  imported?: boolean
  confirmed?: boolean
  producer_id?: string
}

export class UpdateTransactionUseCase {
  constructor(private transactionsRepository: TransactionRepository) {}

  async execute({
    id,
    nome,
    date,
    valor,
    categoria,
    safra,
    conciliado,
    confirmed,
    conta,
    producer_id,
    imported,
  }: UpdateTransactionUseCaseRequest) {
    try {
      const existingTransaction = await this.transactionsRepository.findById(id)

      if (!existingTransaction) {
        throw new ResourceNotFoundError()
      }

      // Cria o objeto base de atualização com tipagem correta
      const updateData: Prisma.TransactionUpdateInput = {
        nome,
        valor,
        date,
        categoria,
        confirmed,
        safra,
        imported,
        conta: conta ?? 'manual',
        conciliado: !!conciliado,
      }

      // Adiciona a relação com o produtor apenas se o producer_id for informado e existir
      if (producer_id) {
        // Verifica se o produtor existe
        const producerExists = await prisma.producers.findUnique({
          where: { id: producer_id },
        })

        if (producerExists) {
          // Adiciona a relação com o produtor
          updateData.producer = { connect: { id: producer_id } }
        } else {
          console.error(`Produtor com ID ${producer_id} não encontrado`)
          // Se não existir, não conecta o produtor, mas a transação continua
        }
      } else if (producer_id === null) {
        // Se producer_id for explicitamente null, desconecta o produtor atual
        updateData.producer = { disconnect: true }
      }

      const transaction = await this.transactionsRepository.update(
        id,
        updateData,
      )

      return transaction
    } catch (error) {
      console.error('Erro ao atualizar transação:', error)
    }
  }
}
