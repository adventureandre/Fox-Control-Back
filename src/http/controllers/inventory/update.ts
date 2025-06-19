import { makeUpdateInventoryUseCase } from '@/use-cases/factories/make-update-inventory-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const updateInventoryParamsSchema = z.object({
    id: z.string().cuid(),
  })

  const updateInventoryBodySchema = z.object({
    crop: z.string().optional(),
    quantity: z.number().optional(),
    average_price: z.number().optional(),
    estimated_value: z.number().optional(),
    producer_id: z.string().optional(),
    active: z.boolean().optional(),
  })

  try {
    const { id } = updateInventoryParamsSchema.parse(request.params)
    const data = updateInventoryBodySchema.parse(request.body)

    const updateInventoryUseCase = makeUpdateInventoryUseCase()

    const response = await updateInventoryUseCase.execute({ ...data, id })

    return reply.status(201).send({
      status: 'success',
      message: 'Inventory updated successfully',
      data: response.inventory,
    })
  } catch (error) {
    console.error('Error updating inventory:', error)
    if (error instanceof z.ZodError) {
      return reply.status(400).send({
        status: 'error',
        message: 'Invalid data',
        errors: error.format(),
      })
    }

    return reply.status(500).send({
      status: 'error',
      message: 'Internal server error',
    })
  }
}
