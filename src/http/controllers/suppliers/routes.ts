import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { getSuppliers } from './get-suppliers'
import { createSupplier } from './create'
import { deleteSupplier } from './delete'
import { updateSupplier } from './update'
import { getSupplierById } from './get-supplier-by-id'

export async function supplierRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.get('/suppliers', getSuppliers)
  app.get('/suppliers/:id', getSupplierById)

  app.post('/suppliers', createSupplier)
  app.put('/suppliers/:id', updateSupplier)
  app.delete('/suppliers/:id', deleteSupplier)
}
