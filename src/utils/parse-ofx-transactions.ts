/* eslint-disable @typescript-eslint/no-explicit-any */
import { DateTime } from 'luxon'

export function extractTransactionsFormOFX(parsedOfx: any) {
  const transacoes =
    parsedOfx.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS.BANKTRANLIST.STMTTRN || []
  const conta =
    parsedOfx.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS.BANKACCTFROM.ACCTID ||
    'desconhecida'

  return transacoes.map((item: any) => ({
    date: parseOfxDate(item.DTPOSTED),
    nome: item.MEMO,
    valor: parseFloat(item.TRNAMT),
    tipo: item.TRNTYPE === 'CREDIT' ? 'CREDITO' : 'DEBITO',
    conta,
    categoria: null,
    conciliado: false,
  }))
}

// utils/formatDate.ts
function parseOfxDate(ofxDate: string): string {
  return DateTime.fromFormat(ofxDate, "yyyyLLddHHmmss'[-3:BRT]'", {
    zone: 'utc',
  }).toISO()!
}
