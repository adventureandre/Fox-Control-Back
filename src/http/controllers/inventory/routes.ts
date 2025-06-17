import { FastifyInstance } from 'fastify'
import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { create } from './create'
import { list } from './list'
import { get } from './get'
import { update } from './update'
import { remove } from './delete'

export async function inventoryRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.post('/inventory', create)
  app.get('/inventory/producer/:id', list)
  app.get('/inventory/:id', get)
  app.put('/inventory/:id', update)
  app.delete('/inventory/:id', remove)
}
