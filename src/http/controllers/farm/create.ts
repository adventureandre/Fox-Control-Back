import { makeCreateFarmUseCase } from '@/use-cases/factories/farm/make-create-farm-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

export async function createFarm(request: FastifyRequest, reply: FastifyReply) {
  const schemaFarm = z.object({
    name: z.string(),
    city: z.string(),
    hectares: z.number(),
    latitude: z.number(),
    longitude: z.number(),
    producer_id: z.string(),
    active: z.boolean().optional(),
  })

  try {
    const data = schemaFarm.parse(request.body)

    const createFarmUseCase = makeCreateFarmUseCase()
    const { farm } = await createFarmUseCase.execute(data)

    return reply.status(201).send({
      status: 'success',
      data: farm,
    })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({
        status: 'error',
        message: 'Produtor não encontrado.',
      })
    }

    if (error instanceof z.ZodError) {
      return reply.status(400).send({
        status: 'error',
        message: 'Erro de validação.',
        issues: error.errors,
      })
    }

    console.error('Erro ao criar fazenda:', error)
    return reply.status(500).send({
      status: 'error',
      message: 'Erro interno do servidor ao criar a fazenda.',
    })
  }
}
