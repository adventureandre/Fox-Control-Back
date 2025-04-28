import { FastifyInstance } from 'fastify'
import { authenticate } from '@/http/controllers/users/authenticate'
import { register } from './register'
import { profile } from './profile'
import { verifyJwt } from '../../middlewares/verify-jwt'
import { refresh } from './refresh'
import { uploadImage } from './upload'
import { updade } from './updade'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)

  app.post('/users/avatar', uploadImage)

  app.post('/users/update', updade)

  app.post('/sessions', authenticate)

  app.patch('/token/refresh', refresh)

  app.get('/me', { onRequest: [verifyJwt] }, profile)
}
