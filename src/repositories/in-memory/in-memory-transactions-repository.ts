import { Transaction } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { TransactionRepository } from '../transaction-repository'

export class InMemoryTransactionsRepository implements TransactionRepository {
  public items: Transaction[] = []

  async findById(id: string) {
    const transaction = this.items.find((item) => item.id === id)

    if (!transaction) {
      return null
    }

    return transaction
  }

  async create(data: Transaction) {
    const transaction = {
      id: randomUUID(),
      date: data.date,
      nome: data.nome,
      tipo: data.tipo,
      valor: data.valor,
      conta: data.conta,
      conciliado: data.conciliado ?? false,
      categoria: data.categoria ?? null,
      created_at: new Date(),
    }

    this.items.push(transaction)

    return transaction
  }
}
