import { FastifyInstance } from 'fastify'

import { create } from './create'
import { uploadOfx } from './upload-ofx'
import { getTransactions } from './get-transactions'
import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { updateTransaction } from './update-transaction'
import { deleteTransaction } from './delete'

export async function transacoesRoutes(app: FastifyInstance) {
  // Verifica se o usuário está autenticado para todas rotas
  app.addHook('onRequest', verifyJwt)

  app.post('/transactions', create)
  app.put('/transactions/:id', updateTransaction)
  app.delete('/transactions/:id', deleteTransaction)
  app.get('/transactions', getTransactions)
  app.post('/transactions/upload', uploadOfx)
}
