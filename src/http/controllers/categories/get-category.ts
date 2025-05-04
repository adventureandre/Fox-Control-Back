import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeGetCategoryUseCase } from '@/use-cases/factories/category/make-get-category-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const getCategoryParamsSchema = z.object({
  code: z.coerce.number().int().positive(),
})

export async function getCategory(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { code } = getCategoryParamsSchema.parse(request.params)

  try {
    const getCategoryUseCase = makeGetCategoryUseCase()
    const category = await getCategoryUseCase.execute({ code })

    return reply.status(200).send(category)
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ error: 'Categoria não encontrada' })
    }
    return reply.status(500).send({ error: 'Erro interno do servidor' })
  }
}
