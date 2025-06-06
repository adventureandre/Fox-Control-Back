import { randomUUID } from 'node:crypto'
import { TransactionRepository } from '../transaction-repository'
import { Prisma, Transaction } from '@prisma/client'

export class InMemoryTransactionsRepository implements TransactionRepository {
  async getTransactions(page?: number, limit?: number): Promise<Transaction[]> {
    const pageNumber = page ?? 1
    const itemsPerPage = limit ?? 10
    const startIndex = (pageNumber - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage

    return this.items.slice(startIndex, endIndex)
  }

  async update(
    id: string,
    data: Prisma.TransactionUpdateInput,
  ): Promise<Transaction> {
    const transactionIndex = this.items.findIndex((item) => item.id === id)

    if (transactionIndex === -1) {
      throw new Error('Transação não encontrada.')
    }

    const transaction = this.items[transactionIndex]

    const updatedTransaction = {
      ...transaction,
      ...(data.nome !== undefined && { nome: data.nome as string }),
      ...(data.tipo !== undefined && { tipo: data.tipo as string }),
      ...(data.valor !== undefined && { valor: data.valor as number }),
      ...(data.conta !== undefined && { conta: data.conta as string }),
      ...(data.conciliado !== undefined && {
        conciliado: data.conciliado as boolean,
      }),
      ...(data.categoria !== undefined && {
        categoria: data.categoria as string,
      }),
      ...(data.date !== undefined && {
        date: new Date(data.date as string | Date),
      }),
      ...(data.imported !== undefined && {
        imported: data.imported as boolean,
      }),
    }

    this.items[transactionIndex] = updatedTransaction as Transaction

    return updatedTransaction as Transaction
  }

  async delete(id: string): Promise<void> {
    const transactionIndex = this.items.findIndex((item) => item.id === id)

    if (transactionIndex === -1) {
      throw new Error('Transação não encontrada.')
    }

    this.items.splice(transactionIndex, 1)
  }

  public items: Transaction[] = []

  async findById(id: string) {
    const transaction = this.items.find((item) => item.id === id)

    if (!transaction) {
      return null
    }

    return transaction
  }

  async create(data: Prisma.TransactionCreateManyInput) {
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
