import { FastifyInstance } from 'fastify'

import { create } from './create'
import { uploadOfx } from './upload-ofx'

export async function transacoesRoutes(app: FastifyInstance) {
  // Verifica se o usuário está autenticado para todas rotas
  // app.addHook('onRequest', verifyJwt)

  app.post('/transactions', create)
  app.post('/transactions/upload', uploadOfx)
}
