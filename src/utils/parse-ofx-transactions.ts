/* eslint-disable @typescript-eslint/no-explicit-any */
import { DateTime } from 'luxon'

export function extractTransactionsFormOFX(parsedOfx: any) {
  const transacoes =
    parsedOfx.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS.BANKTRANLIST.STMTTRN || []
  const conta =
    parsedOfx.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS.BANKACCTFROM.ACCTID ||
    'desconhecida'
  const banco = parsedOfx.OFX.SIGNONMSGSRSV1.SONRS.FI.ORG

  return transacoes.map((item: any) => {
    // Obter o valor numérico da transação
    const valorOriginal = parseFloat(item.TRNAMT)

    // Determinar o tipo baseado no sinal do valor
    const tipo = valorOriginal >= 0 ? 'receita' : 'despesa'

    // Sempre armazenar o valor absoluto (positivo)
    const valorPositivo = Math.abs(valorOriginal)

    return {
      date: parseOfxDate(item.DTPOSTED),
      nome: item.MEMO,
      valor: valorPositivo,
      tipo,
      conta,
      banco,
      categoria: null,
      conciliado: true,
    }
  })
}

// Função para converter a data do OFX para DateTime
function parseOfxDate(ofxDate: string): string {
  return DateTime.fromFormat(ofxDate, "yyyyLLddHHmmss'[-3:BRT]'", {
    zone: 'utc',
  }).toFormat('yyyy-MM-dd') // Retorna string no formato 'YYYY-MM-DD'
}
