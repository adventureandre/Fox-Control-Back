import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeUpdateUserUseCase } from '@/use-cases/factories/user/make-update-user-use-case'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  // Garante que o usuário está autenticado
  await request.jwtVerify()

  // Valida os dados de entrada
  const updateBodySchema = z.object({
    name: z.string().min(3).optional(),
    email: z.string().email().optional(),
    avatar_url: z.string().nullable().optional(),
    phone: z.string().nullable().optional(),
    password: z.string().optional(),
  })

  try {
    // Obtém o ID do usuário autenticado
    const userId = request.user.sub

    // Valida os dados do corpo da requisição
    const { name, email, avatar_url, phone, password } = updateBodySchema.parse(
      request.body,
    )

    console.log('Avatar: ', avatar_url)

    // Verifica se pelo menos um campo foi fornecido
    if (!name && !email && !avatar_url) {
      return reply.status(400).send({
        status: 'error',
        message: 'Pelo menos um campo deve ser fornecido para atualização.',
      })
    }

    const updateUserUseCase = makeUpdateUserUseCase()

    // Executa o caso de uso
    const { user } = await updateUserUseCase.execute({
      userId,
      name,
      email,
      avatar_url,
      phone,
      password,
    })

    // Retorna o usuário atualizado, removendo o campo password_hash
    return reply.status(200).send({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar_url: user.avatar_url,
        created_at: user.created_at,
      },
    })
  } catch (error) {
    // Tratamento de erros específicos
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({
        status: 'error',
        message: 'Usuário não encontrado.',
      })
    }

    if (error instanceof z.ZodError) {
      return reply.status(400).send({
        status: 'error',
        message: 'Dados de entrada inválidos.',
        issues: error.format(),
      })
    }

    // Verifica se é erro de email já utilizado
    if (
      error instanceof Error &&
      error.message === 'E-mail já está sendo utilizado.'
    ) {
      return reply.status(400).send({
        status: 'error',
        message: error.message,
      })
    }

    // Qualquer outro erro
    console.error(error)
    return reply.status(500).send({
      status: 'error',
      message: 'Erro interno do servidor.',
    })
  }
}
