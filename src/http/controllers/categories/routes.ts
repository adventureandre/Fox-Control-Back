import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { listCategories } from './list-categories'
import { getCategory } from './get-category'

export async function categoriesRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.get('/categories', listCategories)
  app.get('/categories/:code', getCategory)
}
