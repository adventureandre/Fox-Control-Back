/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeCreateTransactionsUseCase } from '@/use-cases/factories/transaction/make-create-transactions-use-case'
import { extractTransactionsFormOFX } from '@/utils/parse-ofx-transactions'
import { FastifyReply, FastifyRequest } from 'fastify'
import { parse as parseOFX } from 'ofx-js'

export async function uploadOfx(request: FastifyRequest, reply: FastifyReply) {
  const ofxFile = await request.file()

  if (!ofxFile) {
    return reply.status(400).send({
      status: 'error',
      message: 'Nenhum arquivo foi enviado.',
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
    return reply.status(400).send({
      status: 'error',
      message: 'Arquivo inválido. Envie um arquivo .ofx válido.',
    })
  }

  const fileBuffer = await ofxFile.toBuffer()

  try {
    // Parsear o conteúdo do OFX
    const parsedOfx = await parseOFX(fileBuffer.toString())
    const transactions = extractTransactionsFormOFX(parsedOfx)

    // Obtém o ID do usuário autenticado
    const userId = request.user.sub

    // Adiciona o user_id a cada transação e cria no banco
    const createTransactionsUseCase = makeCreateTransactionsUseCase()

    // Use Promise.all para esperar todas as transações serem criadas
    await Promise.all(
      transactions.map((transaction: any) => {
        // Converte a data para o formato ISO se for uma string de data
        let dateValue: string | Date = transaction.date as string | Date
        if (typeof dateValue === 'string') {
          if (dateValue.includes('T')) {
            dateValue = new Date(dateValue)
          } else {
            dateValue = new Date(`${dateValue}T00:00:00.000Z`)
          }
        }

        // Validação da data
        if (!(dateValue instanceof Date) || isNaN(dateValue.getTime())) {
          throw new Error(`Data inválida encontrada: ${transaction.date}`)
        }

        return createTransactionsUseCase.execute({
          nome: transaction.nome,
          valor: transaction.valor,
          conta: transaction.conta,
          tipo: transaction.tipo,
          banco: transaction.banco,
          categoria: transaction.categoria,
          conciliado: transaction.conciliado,
          imported: true,
          confirmed: false,
          date: dateValue,
          user_id: userId,
        })
      }),
    )

    return reply.status(201).send({
      status: 'success',
      message: 'Arquivo processado com sucesso',
      count: transactions.length,
    })
  } catch (error) {
    console.error('Erro ao processar o arquivo OFX:', error)
    return reply.status(500).send({
      status: 'error',
      message: 'Erro ao processar o arquivo OFX',
    })
  }
}
