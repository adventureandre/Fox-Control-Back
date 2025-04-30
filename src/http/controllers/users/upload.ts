import { FastifyReply, FastifyRequest } from 'fastify'
import path from 'node:path'
import fs from 'node:fs/promises'
import { randomUUID } from 'node:crypto'
import { prisma } from '@/lib/prisma'

export async function uploadImage(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  request.jwtVerify()

  try {
    const userId = request.user.sub

    const imageFile = await request.file({
      limits: {
        fileSize: 25 * 1024 * 1024, // 25MB
      },
    })

    if (!imageFile) {
      return reply.status(400).send({
        message: 'Nenhuma imagem foi enviada.',
      })
    }

    // Validação do tipo de arquivo
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp']

    if (!allowedMimeTypes.includes(imageFile.mimetype)) {
      return reply.status(400).send({
        message: 'Formato de imagem não permitido. Use JPEG, PNG ou WEBP.',
      })
    }

    // Obter o usuário do banco de dados
    const user = await prisma.user.findUnique({
      where: { id: userId },
    })

    if (!user) {
      return reply.status(404).send({
        message: 'Usuário não encontrado.',
      })
    }

    // Remover a imagem antiga, se existir
    if (user.avatar_url) {
      const oldImagePath = path.resolve(
        __dirname,
        '../../../../uploads',
        user.avatar_url.replace('/uploads/', ''),
      )
      try {
        await fs.unlink(oldImagePath) // Remove o arquivo antigo
      } catch (error) {
        console.error('Erro ao remover a imagem antiga:', error)
      }
    }

    // Criar diretório base de uploads se não existir
    const baseUploadsDir = path.resolve(__dirname, '../../../../uploads')
    await fs.mkdir(baseUploadsDir, { recursive: true })

    // Obter a data atual para criar subdiretórios ano/mês
    const now = new Date()
    const year = now.getFullYear().toString()
    const month = (now.getMonth() + 1).toString().padStart(2, '0') // mês com zero à esquerda

    // Caminho completo incluindo ano e mês
    const uploadsDir = path.join(baseUploadsDir, year, month)
    await fs.mkdir(uploadsDir, { recursive: true })

    // Gerar nome único para o arquivo
    const fileExtension = path.extname(imageFile.filename).toLowerCase()
    const fileName = `${randomUUID()}${fileExtension}`
    const filePath = path.join(uploadsDir, fileName)

    // Salvar o arquivo
    await fs.writeFile(filePath, await imageFile.toBuffer())

    // Retorna o caminho da imagem incluindo a estrutura de ano/mês
    const imageUrl = `/uploads/${year}/${month}/${fileName}`

    // Atualizar o avatar do usuário no banco de dados
    await prisma.user.update({
      where: { id: userId },
      data: { avatar_url: imageUrl },
    })

    return reply.status(200).send({
      message: 'Imagem enviada com sucesso.',
      avatar_url: imageUrl,
    })
  } catch (error) {
    console.error('Erro ao processar upload de imagem:', error)
    return reply.status(500).send({
      message: 'Erro ao processar upload de imagem.',
    })
  }
}
