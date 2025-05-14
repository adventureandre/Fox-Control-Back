import { prisma } from '@/lib/prisma'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function deleteProducer(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { id } = z.object({ id: z.string() }).parse(request.params)

  try {
    const producerAccountExists = await prisma.producerAccount.findFirst({
      where: {
        producer_id: id,
      },
    })

    if (producerAccountExists) {
      return reply.status(400).send({
        status: 'error',
        message:
          'Não é possível deletar o produtor, pois ele possui contas bancárias associadas.',
      })
    }

    const producer = await prisma.producers.delete({
      where: { id },
    })

    return reply.status(200).send({
      status: 'success',
      data: producer,
    })
  } catch (error) {
    console.error('Erro ao deletar produtor:', error)
    return reply.status(500).send({
      status: 'error',
      message: 'Erro ao deletar o produtor.',
    })
  }
}
