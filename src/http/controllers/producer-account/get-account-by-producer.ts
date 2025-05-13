import { prisma } from '@/lib/prisma'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getAccountByProducer(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const paramsSchema = z.object({
    producer_id: z.string(),
  })
  console.log('Request params:', request.params)

  const { producer_id } = paramsSchema.parse(request.params)

  try {
    const account = await prisma.producerAccount.findUnique({
      where: { producer_id },
    })

    console.log('Request params:', account)

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
