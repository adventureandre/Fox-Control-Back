import { prisma } from '@/lib/prisma'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function listAccounts(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const accounts = await prisma.producerAccount.findMany()

    return reply.status(200).send(accounts)
  } catch (error) {
    console.error('Erro ao listar contas bancárias:', error)
    return reply.status(500).send({
      status: 'error',
      message: 'Erro ao listar as contas bancárias.',
    })
  }
}
