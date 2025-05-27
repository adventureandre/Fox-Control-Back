import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { getCustomers } from './get-customers'
import { createCustomer } from './create'
import { deleteCustomer } from './delete'

export async function customerRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.get('/customers', getCustomers)
  app.post('/customers', createCustomer)
  app.delete('/customers/:id', deleteCustomer)
}
