import { prisma } from '@/lib/prisma'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getAccountById(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const paramsSchema = z.object({
    id: z.string(),
  })

  const { id } = paramsSchema.parse(request.params)

  try {
    const account = await prisma.producerAccount.findUnique({
      where: { id },
    })

    if (!account) {
      return reply.status(404).send({
        status: 'error',
        message: 'Conta bancária não encontrada.',
      })
    }

    return reply.status(200).send({
      status: 'success',
      data: account,
    })
  } catch (error) {
    console.error('Erro ao buscar conta bancária:', error)
    return reply.status(500).send({
      status: 'error',
      message: 'Erro ao buscar a conta bancária.',
    })
  }
}
