import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeUpdateImmobilizedUseCase } from '@/use-cases/factories/immobilized/make-update-immobilized-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function updateImmobilized(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const updateImmobilizedParamsSchema = z.object({
    id: z.string(),
  })

  const updateImmobilizedBodySchema = z.object({
    name: z.string().optional(),
    currentValue: z.number().optional(),
    estimatedValue: z.number().optional(),
    status: z.string().optional(),
    avaliableAsCollateral: z.boolean().optional(),
    depreciationRate: z.number().optional(),
    acquisitionDate: z.coerce.date().optional(),
    usefulLifeYears: z.number().optional(),
    notes: z.string().optional(),
    active: z.boolean().optional(),
  })

  const { id } = updateImmobilizedParamsSchema.parse(request.params)
  const updateData = updateImmobilizedBodySchema.parse(request.body)

  try {
    const updateImmobilizedUseCase = makeUpdateImmobilizedUseCase()
    const { immobilized } = await updateImmobilizedUseCase.execute({
      id,
      ...updateData,
    })

    return reply.status(200).send({
      status: 'success',
      data: immobilized,
    })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({
        status: 'error',
        message: 'Bem imobilizado não encontrado.',
      })
    }

    console.error('Erro ao atualizar bem imobilizado:', error)
    return reply.status(500).send({
      status: 'error',
      message: 'Erro ao atualizar o bem imobilizado.',
    })
  }
}
