/* eslint-disable @typescript-eslint/no-explicit-any */
import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { hash } from 'bcryptjs'

interface UpdateUserUseCaseRequest {
  userId: string
  name?: string
  email?: string
  avatar_url?: string | null
  phone?: string | null
  password?: string | null
}

interface UpdateUserUseCaseResponse {
  user: User
}

export class UpdateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
    name,
    email,
    avatar_url,
    phone,
    password,
  }: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
    // Verificar se o usuário existe
    const userExists = await this.usersRepository.findById(userId)

    if (!userExists) {
      throw new ResourceNotFoundError()
    }

    // Criar um array com  os dados
    const data: any = {}

    if (name !== undefined) {
      data.name = name
    }

    if (email !== undefined) {
      // Opcional: verificar se o e-mail já está em uso por outro usuário

      if (email !== userExists.email) {
        const userWithSameEmail = await this.usersRepository.findByEmail(email)

        if (userWithSameEmail && userWithSameEmail.id !== userId) {
          throw new Error('E-mail já está sendo utilizado.')
        }
      }

      data.email = email
    }

    if (phone !== undefined) {
      data.phone = phone
    }

    if (avatar_url !== undefined) {
      data.avatar_url = avatar_url
    }

    // Adiciona tratamento para o password
    if (password !== undefined && password !== null) {
      // Apenas gera o hash se uma nova senha for fornecida
      data.password_hash = await hash(password, 6)
    }

    // Atualizar o usuário
    const updatedUser = await this.usersRepository.update({
      id: userId,
      data,
    })

    return {
      user: updatedUser,
    }
  }
}
