import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface UpdateUserUseCaseRequest {
  userId: string
  name?: string
  email?: string
  avatar_url?: string
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
  }: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
    // Verificar se o usuário existe
    const userExists = await this.usersRepository.findById(userId)

    if (!userExists) {
      throw new ResourceNotFoundError()
    }

    // Preparar dados para atualização (apenas os campos fornecidos)
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

    if (avatar_url !== undefined) {
      data.avatar_url = avatar_url
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
