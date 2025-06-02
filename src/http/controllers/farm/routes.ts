import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { createFarm } from './create'
import { updateFarm } from './update'
import { deleteFarm } from './delete'
import { getFarmById } from './get-farm-by-id'
import { getFarmsByProducer } from './get-farms-by-producer'
import { getAllFarms } from './get-all-farms'
import { toggleFarmActive } from './toggle-active'

export async function farmRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.get('/farms', getAllFarms)
  app.get('/farms/:id', getFarmById)
  app.get('/producers/:producerId/farms', getFarmsByProducer)

  app.post('/farms', createFarm)
  app.put('/farms/:id', updateFarm)
  app.patch('/farms/:id/active', toggleFarmActive)
  app.delete('/farms/:id', deleteFarm)
}
