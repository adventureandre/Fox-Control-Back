import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { listCategories } from './list-categories'
import { getCategory } from './get-category'

export async function categoriesRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.get(
    '/categories',
    {
      schema: {
        description: 'Lista todas as categorias cadastradas',
        tags: ['Categorias'],
        security: [{ bearerAuth: [] }],
        response: {
          200: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                code: { type: 'string' },
                description: { type: 'string' },
                level: { type: 'number', description: 'Nível da categoria' },
                type: { type: 'string', description: 'Tipo da categoria' },
                modality: {
                  type: 'string',
                  description: 'Modalidade da categoria',
                },
                parent_id: {
                  type: 'string',
                  description: 'ID da categoria pai',
                },
              },
            },
          },
          404: {
            type: 'object',
            properties: {
              error: { type: 'string' },
            },
          },
        },
      },
    },
    listCategories,
  )

  app.get(
    '/categories/:code',
    {
      schema: {
        description: 'Busca uma categoria pelo código',
        tags: ['Categorias'],
        security: [{ bearerAuth: [] }],
        params: {
          type: 'object',
          properties: {
            code: { type: 'string', description: 'Código da categoria' },
          },
          required: ['code'],
        },
        response: {
          200: {
            type: 'object',
            properties: {
              code: { type: 'string' },
              description: { type: 'string' },
              level: { type: 'number', description: 'Nível da categoria' },
              type: { type: 'string', description: 'Tipo da categoria' },
              modality: {
                type: 'string',
                description: 'Modalidade da categoria',
              },
              parent_id: { type: 'string', description: 'ID da categoria pai' },
            },
          },
          404: {
            type: 'object',
            properties: {
              error: { type: 'string' },
            },
          },
        },
      },
    },
    getCategory,
  )
}
