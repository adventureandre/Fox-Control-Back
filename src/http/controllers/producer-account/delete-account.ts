import { prisma } from '@/lib/prisma'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function deleteAccount(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const paramsSchema = z.object({
    id: z.string(),
  })

  const { id } = paramsSchema.parse(request.params)

  try {
    await prisma.producerAccount.delete({
      where: { id },
    })

    return reply.status(204).send()
  } catch (error) {
    console.error('Erro ao deletar conta bancária:', error)
    return reply.status(500).send({
      status: 'error',
      message: 'Erro ao deletar a conta bancária.',
    })
  }
}
