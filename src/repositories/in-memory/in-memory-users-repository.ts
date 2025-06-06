import { UsersRepository } from '@/repositories/users-repository'
import { User, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      phone: data.phone ?? null,
      status: 'active',
      avatar_url: data.avatar_url ?? null,
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.items.push(user)

    return user
  }

  async update(params: { id: string; data: Prisma.UserUpdateInput }) {
    const userIndex = this.items.findIndex((item) => item.id === params.id)

    if (userIndex >= 0) {
      const updateUser = { ...this.items[userIndex] }

      updateUser.name = params.data.name as string
      updateUser.email = params.data.email as string
      updateUser.password_hash = params.data.password_hash as string
      updateUser.phone = params.data.phone as string
      updateUser.status = params.data.status as string
      updateUser.avatar_url = params.data.avatar_url as string
      updateUser.updated_at = new Date()

      this.items[userIndex] = updateUser

      return this.items[userIndex]
    }

    return this.items[userIndex]
  }

  async delete(id: string): Promise<void> {
    this.items = this.items.filter((item) => item.id !== id)
  }
}
