import { expect, describe, it, beforeEach } from 'vitest'
import { CreateTransactionsUseCase } from './create-transactions'
import { InMemoryTransactionsRepository } from '@/repositories/in-memory/in-memory-transactions-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { User } from '@prisma/client'

let transactionRepository: InMemoryTransactionsRepository
let sut: CreateTransactionsUseCase
let useRepository: InMemoryUsersRepository

describe('Create Transaction Use Case', () => {
  beforeEach(() => {
    transactionRepository = new InMemoryTransactionsRepository()
    useRepository = new InMemoryUsersRepository()
    sut = new CreateTransactionsUseCase(transactionRepository, useRepository)
  })

  it('should register a transaction', async () => {
    // Criando um usuário de teste no repositório em memória
    useRepository.items.push({
      id: 'user-01',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: 'hashed-password',
      created_at: new Date(),
      updated_at: new Date(),
      avatar_url: null,
      status: 'active',
      phone: null,
    } as User)

    const { transaction } = await sut.execute({
      conta: '005444-8',
      date: new Date('2023-10-01'),
      nome: 'Salário Outubro',
      tipo: 'saida',
      valor: 3000,
      categoria: 102, // Número em vez de string para categoria
      conciliado: true,
      user_id: 'user-01',
      banco: 'Banco A', // Campo obrigatório conforme validate no create-transactions.ts
    })

    expect(transaction).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        conta: '005444-8',
        date: expect.any(Date),
        nome: 'Salário Outubro',
        tipo: 'saida',
        valor: 3000,
        categoria: 102,
        conciliado: true,
        created_at: expect.any(Date),
      }),
    )
  })
})
