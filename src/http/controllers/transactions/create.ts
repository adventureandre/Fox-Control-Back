import { prisma } from '@/lib/prisma'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  // Obtém o ID do usuário autenticado
  const userId = request.user.sub

  // Valida o corpo da requisição
  const createBodySchema = z.object({
    nome: z.string(),
    date: z.string(),
    valor: z.string().transform((valor) => parseFloat(valor)),
    tipo: z.enum(['entrada', 'saida']),
    categoria: z.string().nullable().optional(),
    conta: z.string().optional(),
    concilado: z.boolean().optional(),
  })

  const { nome, categoria, date, tipo, valor, conta, concilado } =
    createBodySchema.parse(request.body)

  // Cria a transação associada ao usuário
  const transaction = await prisma.transaction.create({
    data: {
      nome,
      date,
      valor,
      tipo,
      user_id: userId, // Associa a transação ao usuário
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
