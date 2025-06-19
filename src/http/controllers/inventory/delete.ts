import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeDeleteInventoryUseCase } from '@/use-cases/factories/make-delete-inventory-use-case'

export async function remove(request: FastifyRequest, reply: FastifyReply) {
  const deleteInventoryParamsSchema = z.object({
    id: z.string().cuid(),
  })

  const { id } = deleteInventoryParamsSchema.parse(request.params)

  const deleteInventoryUseCase = makeDeleteInventoryUseCase()

  await deleteInventoryUseCase.execute({
    id,
  })

  return reply.status(204).send()
}
