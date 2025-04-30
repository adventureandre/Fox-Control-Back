import { prisma } from '@/lib/prisma'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    nome: z.string(),
    date: z.string(),
    valor: z.string().transform((valor) => {
      return parseFloat(valor)
    }),
    tipo: z.enum(['DEBITO', 'CREDITO']),
    categoria: z.string().nullable().optional(),
    conta: z.string().optional(),
    concilado: z.boolean().optional(),
  })

  const { nome, categoria, date, tipo, valor, conta, concilado } =
    createBodySchema.parse(request.body)

  console.log('data', date)

  const transaction = await prisma.transaction.create({
    data: {
      nome,
      date,
      valor,
      tipo,
      categoria: categoria ?? null,
      conta: conta ?? 'manual',
      conciliado: !!concilado,
    },
  })

  return reply.status(201).send({
    message: 'Transação criada com sucesso',
    data: transaction,
  })
}
