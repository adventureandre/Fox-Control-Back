import { prisma } from '@/lib/prisma'
import { makeGetCategoryUseCase } from '@/use-cases/factories/category/make-get-category-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function getBalance(request: FastifyRequest, reply: FastifyReply) {
  const { account_id } = request.params as { account_id: string }

  try {
    const account = await prisma.producerAccount.findUnique({
      where: { id: account_id },
    })

    if (!account) {
      return reply.status(404).send({
        status: 'error',
        message: 'Conta bancária não encontrada.',
      })
    }

    const transactionsbyAccount = await prisma.transaction.findMany({
      where: {
        conta: account.conta,
        confirmed: true,
      },
    })

    if (!transactionsbyAccount) {
      return reply.status(404).send({
        status: 'error',
        message: 'Nenhuma transação encontrada para esta conta.',
      })
    }

    const transactionsnotCategory = transactionsbyAccount.filter(
      (transaction) => transaction.categoria === null,
    )

    const transactionswithCategory = transactionsbyAccount.filter(
      (transaction) => transaction.categoria,
    )

    let resultBalanceNotCategory = 0
    for (const transaction of transactionswithCategory) {
      const getCategoryUseCase = makeGetCategoryUseCase()
      const category = await getCategoryUseCase.execute({
        code: transaction.categoria!,
      })

      if (category.type === 'despesa') {
        resultBalanceNotCategory -= Number(transaction.valor)
      } else if (category.type === 'receita') {
        resultBalanceNotCategory += Number(transaction.valor)
      }
    }

    const resultBalanceWithCategory = transactionsnotCategory.reduce(
      (acc, transaction) => {
        if (transaction.tipo === 'despesa') {
          return acc - Number(transaction.valor)
        } else if (transaction.tipo === 'receita') {
          return acc + Number(transaction.valor)
        }
        return acc
      },
      0,
    )

    const totalBalance = resultBalanceNotCategory + resultBalanceWithCategory

    return reply.status(200).send({
      status: 'success',
      totalBalance,
    })
  } catch (error) {
    console.error('Erro ao obter saldo da conta bancária:', error)
    return reply.status(500).send({
      status: 'error',
      message: 'Erro ao obter o saldo da conta bancária.',
    })
  }
}
