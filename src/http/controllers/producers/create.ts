import { prisma } from '@/lib/prisma'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createProducer(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const schemaProducer = z.object({
    name: z.string(),
    cpf: z.string().regex(/^\d{11}$/, 'CPF deve conter 11 dígitos numéricos'),
  })

  try {
    const { name, cpf } = schemaProducer.parse(request.body)

    console.log('Criando produtor:', request.body)

    const producer = await prisma.producers.create({
      data: {
        name,
        cpf,
      },
    })

    return reply.status(201).send({
      status: 'success',
      data: producer,
    })
  } catch (error) {
    console.error('Erro ao criar produtor:', error)
    if (error instanceof z.ZodError) {
      return reply.status(400).send({
        status: 'error',
        message: 'Erro de validação.',
        issues: error.errors,
      })
    }
    return reply.status(500).send({
      status: 'error',
      message: 'Erro ao criar o produtor.',
    })
  }
}
