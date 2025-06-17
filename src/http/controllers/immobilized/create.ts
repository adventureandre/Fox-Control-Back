import { makeCreateImmobilizedUseCase } from '@/use-cases/factories/immobilized/make-create-immobilized-use-case'
import { makeGetProducerByIdUseCase } from '@/use-cases/factories/producer/make-get-producer-by-id-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createImmobilized(
  request: FastifyRequest,
  replay: FastifyReply,
) {
  const shcemaImmobilized = z.object({
    name: z.string().min(1, 'Nome é obrigatório.'),
    currentValue: z
      .number()
      .min(0, 'Valor atual deve ser maior ou igual a zero.'),
    status: z.string().min(1, 'Status é obrigatório.'),
    owner: z.string().min(1, 'Dono é obrigatório.'),
    type: z.string().optional(),
    manufacturer: z.string().optional(),
    manufactureYear: z.number().int().optional(),
    avaliableAsCollateral: z.boolean().optional(),
    depreciationRate: z
      .number()
      .min(0, 'Taxa de depreciação deve ser maior ou igual a zero.')
      .optional(),
    notes: z.string().optional(),
    producer_id: z.string().cuid('ID do produtor inválido.'),
    active: z.boolean().optional(),
  })

  const immobilized = shcemaImmobilized.parse(request.body)

  try {
    const getProducerUseCase = makeGetProducerByIdUseCase()
    const response = await getProducerUseCase.execute({
      producer_id: immobilized.producer_id,
    })

    if (!response.producer) {
      return replay.status(404).send({
        status: 'error',
        message: 'Produtor não encontrado.',
      })
    }

    if (!response.producer.active) {
      return replay.status(400).send({
        status: 'error',
        message: 'Produtor inativo, não é possível criar bens imobilizados.',
      })
    }
    const createImmobilizedUseCase = makeCreateImmobilizedUseCase()
    const result = await createImmobilizedUseCase.execute(immobilized)

    return replay.status(201).send({
      status: 'success',
      data: result,
    })
  } catch (error) {
    console.error('Erro ao criar bem imobilizado:', error)
    return replay.status(500).send({
      status: 'error',
      message: 'Erro ao criar o bem imobilizado.',
    })
  }
}
