import { prisma } from '@/lib/prisma'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function updateAccount(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const paramsSchema = z.object({
    id: z.string(),
  })

  const bodySchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    conta: z.string().optional(),
    balance: z.number().optional(),
    banco: z.string().optional(),
    active: z.boolean().optional(),
    producer_id: z.string().optional(),
  })

  const { id } = paramsSchema.parse(request.params)
  const data = bodySchema.parse(request.body)

  try {
    const updatedAccount = await prisma.producerAccount.update({
      where: { id },
      data,
    })

    return reply.status(200).send({
      status: 'success',
      data: updatedAccount,
    })
  } catch (error) {
    console.error('Erro ao atualizar conta bancária:', error)
    return reply.status(500).send({
      status: 'error',
      message: 'Erro ao atualizar a conta bancária.',
    })
  }
}
