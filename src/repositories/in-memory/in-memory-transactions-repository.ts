import { randomUUID } from 'node:crypto'
import { TransactionRepository } from '../transaction-repository'
import { Prisma, Transaction } from '@prisma/client'

export class InMemoryTransactionsRepository implements TransactionRepository {
  public items: Transaction[] = []

  async findById(id: string) {
    const transaction = this.items.find((item) => item.id === id)

    if (!transaction) {
      return null
    }

    return transaction
  }

  async create(data: Prisma.TransactionCreateInput) {
    const transaction = {
      id: randomUUID(),
      user_id: data.user_id ?? '',
      date: new Date(data.date),
      nome: data.nome,
      tipo: data.tipo,
      valor: data.valor,
      conta: data.conta,
      conciliado: data.conciliado ?? false,
      categoria: data.categoria ?? null,
      created_at: new Date(),
      imported: data.imported ?? false,
    }

    this.items.push(transaction as Transaction)

    return transaction as Transaction
  }
}
