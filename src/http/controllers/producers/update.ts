import { makeUpdateProducerUseCase } from '@/use-cases/factories/producer/make-update-producer-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

export async function updateProducer(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const paramsSchema = z.object({
    id: z.string().cuid(),
  })

  const bodySchema = z.object({
    name: z.string().optional(),
    cpf: z.string().optional(),
    phone: z.string().optional(),
    group: z.string().optional(),
    farm: z.string().optional(),
    email: z.string().email().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    active: z.boolean().optional(),
  })

  try {
    const { id } = paramsSchema.parse(request.params)
    const data = bodySchema.parse(request.body)

    const updateProducerUseCase = makeUpdateProducerUseCase()

    const { producer } = await updateProducerUseCase.execute({
      id,
      ...data,
    })

    return reply.status(200).send({
      status: 'success',
      data: producer,
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

    if (error instanceof Error) {
      return reply.status(409).send({
        status: 'error',
        message: error.message,
      })
    }

    console.error('Erro ao atualizar produtor:', error)
    return reply.status(500).send({
      status: 'error',
      message: 'Erro interno do servidor ao atualizar o produtor.',
    })
  }
}
