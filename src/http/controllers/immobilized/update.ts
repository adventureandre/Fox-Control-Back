import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeGetImmobilizedUseCase } from '@/use-cases/factories/immobilized/make-get-immobilized-use-case'
import { makeUpdateImmobilizedUseCase } from '@/use-cases/factories/immobilized/make-update-immobilized-use-case'
import { makeGetProducerByIdUseCase } from '@/use-cases/factories/producer/make-get-producer-by-id-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function updateImmobilized(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const updateImmobilizedParamsSchema = z.object({
    id: z.string().cuid('ID do bem imobilizado inválido.'),
  })

  const updateImmobilizedBodySchema = z.object({
    name: z.string().min(1, 'Nome é obrigatório.').optional(),
    currentValue: z
      .number()
      .min(0, 'Valor atual deve ser maior ou igual a zero.')
      .optional(),
    status: z.string().min(1, 'Status é obrigatório.').optional(),
    owner: z.string().min(1, 'Dono é obrigatório.').optional(),
    type: z.string().optional(),
    manufacturer: z.string().optional(),
    manufactureYear: z.number().int().optional(),
    avaliableAsCollateral: z.boolean().optional(),
    depreciationRate: z
      .number()
      .min(0, 'Taxa de depreciação deve ser maior ou igual a zero.')
      .optional(),
    notes: z.string().optional(),
    active: z.boolean().optional(),
  })

  const { id } = updateImmobilizedParamsSchema.parse(request.params)
  const updateData = updateImmobilizedBodySchema.parse(request.body)

  try {
    // Primeiro buscar o imobilizado para verificar se existe e pegar o producerId
    const getImmobilizedUseCase = makeGetImmobilizedUseCase()
    const immobilizedResponse = await getImmobilizedUseCase.execute({ id })

    if (!immobilizedResponse.immobilized) {
      return reply.status(404).send({
        status: 'error',
        message: 'Bem imobilizado não encontrado.',
      })
    }

    // Verificar o produtor antes de atualizar
    const getProducerUseCase = makeGetProducerByIdUseCase()
    const producerResponse = await getProducerUseCase.execute({
      producer_id: immobilizedResponse.immobilized.producer_id,
    })

    if (!producerResponse.producer) {
      return reply.status(404).send({
        status: 'error',
        message: 'Produtor não encontrado.',
      })
    }

    if (!producerResponse.producer.active) {
      return reply.status(400).send({
        status: 'error',
        message:
          'Produtor inativo, não é possível atualizar bens imobilizados.',
      })
    }

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
