import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { deleteCustomer } from './delete'
import { createCustomer } from './create'
import { getCustomers } from './get-customers'
import { updateCustomer } from './update'

export async function customerRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.get('/customers', getCustomers)
  app.post('/customers', createCustomer)
  app.put('/customers/:id', updateCustomer)
  app.delete('/customers/:id', deleteCustomer)
}
