import { makeGetInventoryUseCase } from '@/use-cases/factories/make-get-inventory-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function get(request: FastifyRequest, reply: FastifyReply) {
  const getInventoryParamsSchema = z.object({
    id: z.string().cuid(),
  })

  const { id } = getInventoryParamsSchema.parse(request.params)

  const getInventoryUseCase = makeGetInventoryUseCase()

  const { inventory } = await getInventoryUseCase.execute({
    id,
  })

  return reply.status(200).send({
    status: 'success',
    data: inventory,
  })
}
