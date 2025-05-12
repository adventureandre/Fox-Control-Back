import { prisma } from '@/lib/prisma'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createBankAccount(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const schemaBankAccount = z.object({
    name: z.string(),
    description: z.string().optional(),
    conta: z.string(),
    banco: z.string(),
    producer_id: z.string(),
  })

  const { conta, description, name, banco, producer_id } =
    schemaBankAccount.parse(request.body)

  try {
    const bankAccount = await prisma.producerAccount.create({
      data: {
        name,
        description,
        conta,
        banco,
        producer_id,
      },
    })

    return reply.status(201).send(bankAccount)
  } catch (error) {
    console.error('Erro ao criar conta bancária:', error)
    return reply.status(500).send({
      status: 'error',
      message: 'Erro ao criar a conta bancária.',
    })
  }
}
