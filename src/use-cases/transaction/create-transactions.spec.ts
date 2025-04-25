import { expect, describe, it, beforeEach } from 'vitest'
import { CreateTransactionsUseCase } from './create-transactions'
import { InMemoryTransactionsRepository } from '@/repositories/in-memory/in-memory-transactions-repository'

let transactionRepository: InMemoryTransactionsRepository
let sut: CreateTransactionsUseCase

describe('Create Transaction Use Case', () => {
  beforeEach(() => {
    transactionRepository = new InMemoryTransactionsRepository()
    sut = new CreateTransactionsUseCase(transactionRepository)
  })

  it('should register a transaction', async () => {
    const { transaction } = await sut.execute({
      conta: '005444-8',
      date: new Date('2023-10-01'),
      nome: 'Salário Outubro',
      tipo: 'CREDITO',
      valor: 3000,
      categoria: 'Salário',
      conciliado: true,
    })

    expect(transaction).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        conta: '005444-8',
        date: new Date('2023-10-01'),
        nome: 'Salário Outubro',
        tipo: 'CREDITO',
        valor: 3000,
        categoria: 'Salário',
        conciliado: true,
        createdAt: expect.any(Date),
      }),
    )
  })
})
