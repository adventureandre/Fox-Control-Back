import { makeUpdateInventoryUseCase } from '@/use-cases/factories/make-update-inventory-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const updateInventoryParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const updateInventoryBodySchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    quantity: z.number().optional(),
    unit: z.string().optional(),
    category_id: z.string().optional(),
  })

  const { id } = updateInventoryParamsSchema.parse(request.params)
  const { name, description, quantity, unit, category_id } =
    updateInventoryBodySchema.parse(request.body)

  const updateInventoryUseCase = makeUpdateInventoryUseCase()

  await updateInventoryUseCase.execute({
    id,
    name,
    description,
    quantity,
    unit,
    category_id,
  })

  return reply.status(204).send()
}
