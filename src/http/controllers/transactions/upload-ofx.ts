import { makeCreateTransactionsUseCase } from '@/use-cases/factories/make-create-transactions-use-case'
import { extractTransactionsFormOFX } from '@/utils/parse-ofx-transactions'
import { Transaction } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import { parse as parseOFX } from 'ofx-js'

export async function uploadOfx(request: FastifyRequest, reply: FastifyReply) {
  const ofxFile = await request.file()

  if (!ofxFile) {
    return reply.status(400).send({
      message: 'Nemhum arquivo foi enviado.',
    })
  }

  const allowedExtensions = ['.ofx']
  const allowedMimeTypes = [
    'application/ofx',
    'application/xml',
    'text/xml',
    'application/octet-stream',
  ]
  const fileExt = ofxFile.filename.toLowerCase().slice(-4)

  if (
    !allowedExtensions.includes(fileExt) ||
    !allowedMimeTypes.includes(ofxFile.mimetype)
  ) {
    return reply
      .status(400)
      .send({ message: 'Arquivo inválido. Envie um arquivo .ofx válido.' })
  }

  const fileBuffer = await ofxFile.toBuffer()

  try {
    // Parsear o conteúdo do OFX
    const parsedOfx = await parseOFX(fileBuffer.toString())
    const data: Transaction[] = extractTransactionsFormOFX(parsedOfx)
    console.log(data)

    data.map((transaction) => {
      const createTransactionsUseCase = makeCreateTransactionsUseCase()
      return createTransactionsUseCase.execute(transaction)
    })

    return reply.status(201).send({ message: 'Arquivo processado com sucesso' })
  } catch (error) {
    return reply
      .status(500)
      .send({ message: 'Erro ao processar o arquivo OFX' })
  }
}
