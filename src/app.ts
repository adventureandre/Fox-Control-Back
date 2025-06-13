import fastify from 'fastify'

import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import fastifyMultipart from '@fastify/multipart'
import fastifyCors from '@fastify/cors'
import fastifyStatic from '@fastify/static'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'

import { ZodError } from 'zod'
import { env } from '@/env'
import path from 'node:path'

import { usersRoutes } from '@/http/controllers/users/routes'
import { transacoesRoutes } from './http/controllers/transactions/routes'
import { categoriesRoutes } from './http/controllers/categories/routes'
import { producersRoutes } from './http/controllers/producers/routes'
import { accountRoutes } from './http/controllers/producer-account/routes'
import { supplierRoutes } from './http/controllers/suppliers/routes'
import { farmRoutes } from './http/controllers/farm/routes'
import { customerRoutes } from './http/controllers/customers/routes'
import { immobilizedRoutes } from './http/controllers/immobilized/route'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '30d',
  },
})

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Fox-Control API',
      description: 'Documentação da API do Dashboard Financeiro',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

app.register(fastifyCors, {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
})

app.register(fastifyCookie)
app.register(fastifyMultipart)

// Routes
app.register(usersRoutes)
app.register(transacoesRoutes)
app.register(categoriesRoutes)
app.register(producersRoutes)
app.register(accountRoutes)
app.register(customerRoutes)
app.register(supplierRoutes)
app.register(farmRoutes)
app.register(immobilizedRoutes)

// Pagina statica de uploads
app.register(fastifyStatic, {
  root: path.join(__dirname, '..', 'uploads'),
  prefix: '/uploads/',
})

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Here we should log to a external tool like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
