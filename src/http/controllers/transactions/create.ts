import { makeCreateTransactionsUseCase } from '@/use-cases/factories/transaction/make-create-transactions-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const userId = request.user.sub

  const createBodySchema = z.object({
    nome: z.string(),
    date: z.string().transform((val) => {
      const parsedDate = new Date(
        val.includes('T') ? val : `${val}T00:00:00.000Z`,
      )
      if (isNaN(parsedDate.getTime())) {
        throw new Error(
          'O campo `date` é inválido. Certifique-se de que é uma data válida.',
        )
      }
      return parsedDate
    }),
    valor: z.union([
      z.string().transform((val) => parseFloat(parseFloat(val).toFixed(2))),
      z.number().transform((val) => parseFloat(val.toFixed(2))),
    ]),
    categoria: z.number().nullable().optional(),
    conta: z.string(),
    banco: z.string(),
    conciliado: z.boolean().optional(),
    confirmed: z.boolean().optional(),
  })

  const { nome, date, valor, categoria, conta, banco, conciliado, confirmed } =
    createBodySchema.parse(request.body)

  try {
    const createTransactionsUseCase = makeCreateTransactionsUseCase()
    const transaction = await createTransactionsUseCase.execute({
      nome,
      date,
      valor,
      user_id: userId,
      categoria,
      banco,
      conta,
      conciliado: !!conciliado,
      confirmed: !!confirmed,
    })

    return reply.status(201).send(transaction)
  } catch (error) {
    console.error('Erro ao criar transação:', error)
    return reply.status(500).send({ error: 'Erro interno do servidor' })
  }
}
