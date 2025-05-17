import { makeCreateProducerUseCase } from '@/use-cases/factories/producer/make-create-producer-use-case'
import { makeGetProducerByCpfUseCase } from '@/use-cases/factories/producer/make-get-producer-by-cpf-use-case'

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

    const getProducerByCpfUseCase = makeGetProducerByCpfUseCase()
    const { producer } = await getProducerByCpfUseCase.execute({ cpf })

    if (producer) {
      return reply.status(409).send({
        status: 'error',
        message: 'Já existe um produtor cadastrado com este CPF.',
      })
    }

    const createProducerUseCase = makeCreateProducerUseCase()
    const producerCreate = await createProducerUseCase.execute({
      name,
      cpf,
    })

    return reply.status(201).send({
      status: 'success',
      data: producerCreate,
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
