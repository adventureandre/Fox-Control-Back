import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { getSuppliers } from './get-suppliers'
import { createSupplier } from './create'
import { deleteSupplier } from './delete'

export async function supplierRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.get('/suppliers', getSuppliers)
  app.post('/suppliers', createSupplier)
  app.delete('/suppliers/:id', deleteSupplier)
}
