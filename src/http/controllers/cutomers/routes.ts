import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { getCustomers } from './get-customers'
import { createCustomer } from './create'

export async function customersRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.get('/customers', getCustomers)
  app.post('/customers', createCustomer)
}
