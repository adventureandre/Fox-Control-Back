import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { getProducers } from './get-producers'
import { createProducer } from './create'
import { deleteProducer } from './delete'
import { getProducerById } from './get-producer-by-id'

export async function producersRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.get('/producers', getProducers)
  app.get('/producers/:id', getProducerById)

  app.post('/producers', createProducer)

  app.delete('/producers/:id', deleteProducer)
}
