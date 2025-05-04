import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { listCategories } from './list-categories'

export async function categoriesRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.get('/categories', listCategories)
}
