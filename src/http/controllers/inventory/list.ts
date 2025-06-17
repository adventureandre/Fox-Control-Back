import { FastifyReply, FastifyRequest } from 'fastify'
import { makeListInventoryUseCase } from '@/use-cases/factories/make-list-inventory-use-case'
import { z } from 'zod'

export async function list(request: FastifyRequest, reply: FastifyReply) {
  const listInventoryQuerySchema = z.object({
    producer_id: z.string().cuid().optional(),
  })

  const { producer_id } = listInventoryQuerySchema.parse(request.query)

  const listInventoryUseCase = makeListInventoryUseCase()

  const { inventories } = await listInventoryUseCase.execute({
    producerId: producer_id,
  })

  return reply.status(200).send({
    status: 'success',
    data: inventories,
  })
}
