import { makeCreateInventoryUseCase } from '@/use-cases/factories/make-create-inventory-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createInventoryBodySchema = z.object({
    crop: z.string(),
    quantity: z.number(),
    average_price: z.number().optional(),
    estimated_value: z.number().optional(),
    producer_id: z.string(),
    active: z.boolean().default(true),
  })

  try {
    const data = createInventoryBodySchema.parse(request.body)

    const createInventoryUseCase = makeCreateInventoryUseCase()
    const inventory = await createInventoryUseCase.execute(data)

    return reply.status(201).send({
      status: 'success',
      data: inventory,
    })
  } catch (error) {
    console.error('Erro ao criar item de inventário:', error)
    if (error instanceof z.ZodError) {
      return reply.status(400).send({
        status: 'error',
        message: 'Dados inválidos',
        errors: error.format(),
      })
    }

    return reply.status(500).send({
      status: 'error',
      message: 'Erro interno do servidor',
    })
  }
}
