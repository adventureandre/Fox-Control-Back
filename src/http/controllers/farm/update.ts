import { makeUpdateFarmUseCase } from '@/use-cases/factories/farm/make-update-farm-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

export async function updateFarm(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    id: z.string().cuid(),
  })

  const bodySchema = z.object({
    name: z.string().optional(),
    city: z.string().optional(),
    hectares: z.number().optional(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    producers_id: z.string().optional(),
    active: z.boolean().optional(),
  })

  try {
    const { id } = paramsSchema.parse(request.params)
    const data = bodySchema.parse(request.body)

    const updateFarmUseCase = makeUpdateFarmUseCase()

    const { farm } = await updateFarmUseCase.execute({
      id,
      ...data,
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

    console.error('Erro ao atualizar fazenda:', error)
    return reply.status(500).send({
      status: 'error',
      message: 'Erro interno do servidor ao atualizar a fazenda.',
    })
  }
}
