import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { listCategories } from './list-categories'
import { getCategory } from './get-category'

export async function categoriesRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.get(
    '/categories',
    {
      schema: {
        description: 'Lista todas as categorias cadastradas',
        tags: ['Categorias'],
        response: {
          200: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                code: { type: 'string', description: 'Código da categoria' },
                name: { type: 'string', description: 'Nome da categoria' },
              },
            },
          },
          404: {
            type: 'object',
            properties: {
              error: { type: 'string' },
            },
          },
        },
        security: [{ bearerAuth: [] }],
      },
    },
    listCategories,
  )

  app.get('/categories/:code', getCategory)
}
