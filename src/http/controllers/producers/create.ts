import { prisma } from '@/lib/prisma'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createProducer(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const schemaProducer = z.object({
    name: z.string(),
    cpf: z.string(),
  })

  try {
    const { name, cpf } = schemaProducer.parse(request.body)

    console.log('Criando produtor:', request.body)

    // Verifica se já existe um produtor com este CPF
    const existingProducer = await prisma.producers.findUnique({
      where: {
        cpf,
      },
    })

    if (existingProducer) {
      return reply.status(409).send({
        status: 'error',
        message: 'Já existe um produtor cadastrado com este CPF.',
      })
    }

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
