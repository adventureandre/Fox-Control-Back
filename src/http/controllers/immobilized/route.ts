import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { createImmobilized } from './create'
import { deleteImmobilized } from './delete'
import { getImmobilized } from './get'
import { listImmobilized } from './list'
import { updateImmobilized } from './update'

export async function immobilizedRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.post('/immobilized', createImmobilized)
  app.get('/immobilized/producer/:id', listImmobilized)
  app.get('/immobilized/:id', getImmobilized)
  app.put('/immobilized/:id', updateImmobilized)
  app.delete('/immobilized/:id', deleteImmobilized)
}
