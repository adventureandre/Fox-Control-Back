import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { getProducers } from './get-producers'
import { createProducer } from './create'
import { deleteProducer } from './delete'

export async function producersRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.get('/producers', getProducers)
  app.post('/producers', createProducer)
  app.delete('/producers/:id', deleteProducer)
}
