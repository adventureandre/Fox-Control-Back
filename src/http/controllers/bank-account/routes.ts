import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { createBankAccount } from './create'

export async function accountRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  // app.get('/account', listAccounts)
  // app.get('/account/:code', getAccount)
  app.post('/account', createBankAccount)
}
