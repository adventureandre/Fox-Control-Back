import { prisma } from '@/lib/prisma'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getAllFarms(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const querySchema = z.object({
    active: z.enum(['true', 'false']).optional(),
  })

  try {
    const query = querySchema.parse(request.query)

    let whereClause = {}

    // Se o parâmetro active for fornecido, filtra por status
    if (query.active !== undefined) {
      whereClause = {
        active: query.active === 'true',
      }
    }

    const farms = await prisma.farm.findMany({
      where: whereClause,
      include: {
        producer: true,
      },
      orderBy: {
        name: 'asc',
      },
    })

    return reply.status(200).send({
      status: 'success',
      data: farms,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply.status(400).send({
        status: 'error',
        message: 'Erro de validação.',
        issues: error.errors,
      })
    }

    console.error('Erro ao buscar fazendas:', error)
    return reply.status(500).send({
      status: 'error',
      message: 'Erro interno do servidor ao buscar fazendas.',
    })
  }
}
