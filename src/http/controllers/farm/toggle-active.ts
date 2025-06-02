import { makeUpdateFarmUseCase } from '@/use-cases/factories/farm/make-update-farm-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

export async function toggleFarmActive(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const paramsSchema = z.object({
    id: z.string().cuid(),
  })

  const bodySchema = z.object({
    active: z.boolean(),
  })

  try {
    const { id } = paramsSchema.parse(request.params)
    const { active } = bodySchema.parse(request.body)

    const updateFarmUseCase = makeUpdateFarmUseCase()

    const { farm } = await updateFarmUseCase.execute({
      id,
      active,
    })

    return reply.status(200).send({
      status: 'success',
      data: farm,
    })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({
        status: 'error',
        message: 'Fazenda não encontrada.',
      })
    }

    if (error instanceof z.ZodError) {
      return reply.status(400).send({
        status: 'error',
        message: 'Erro de validação.',
        issues: error.errors,
      })
    }

    console.error('Erro ao atualizar status da fazenda:', error)
    return reply.status(500).send({
      status: 'error',
      message: 'Erro interno do servidor ao atualizar o status da fazenda.',
    })
  }
}
