import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { createBankAccount } from './create'
import { listAccounts } from './fetch-all-accounts'
import { getAccountById } from './get-account-by-id'
import { updateAccount } from './update-account'
import { deleteAccount } from './delete-account'
import { getAccountByProducer } from './get-account-by-producer'
import { getBalance } from './get-balance'

export async function accountRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.get('/producer-accounts', listAccounts)
  app.get('/producer-accounts/:id', getAccountById)
  app.get('/producer-accounts/:producer_id/by-producer', getAccountByProducer)
  app.get('/producer-accounts/:account_id/balance', getBalance)

  app.post('/producer-accounts', createBankAccount)
  app.put('/producer-accounts/:id', updateAccount)
  app.delete('/producer-accounts/:id', deleteAccount)
}
