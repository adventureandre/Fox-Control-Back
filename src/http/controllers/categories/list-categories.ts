import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeFetchAllCategoriesUseCase } from '@/use-cases/factories/category/make-fetch-all-categories-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function listCategories(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const fetchAllCategoriesUseCase = makeFetchAllCategoriesUseCase()
    const categories = await fetchAllCategoriesUseCase.execute()

    return reply.status(200).send(categories)
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ error: 'Categorias não encontradas' })
    }

    console.error(error)
    return reply.status(500).send({ error: 'Internal server error' })
  }
}
