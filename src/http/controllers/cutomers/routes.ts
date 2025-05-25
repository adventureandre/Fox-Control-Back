import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { getCustomers } from './get-customers'

export async function customersRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.get('/customers', getCustomers)
}
