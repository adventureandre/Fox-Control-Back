import { prisma } from '@/lib/prisma'

export async function seedCategories() {
  const categories = [
    // Nível 1 - Entradas
    {
      code: 1,
      level: 1,
      description: 'ENTRADAS',
      parent_id: null,
      type: 'receita',
    },

    // Nível 3 - Receita
    {
      code: 101,
      level: 3,
      description: 'RECEITA',
      parent_id: 1,
      type: 'receita',
    },

    // Nível 4 - Receita Semente
    {
      code: 1011,
      level: 4,
      description: 'RECEITA SEMENTE',
      parent_id: 101,
      type: 'receita',
    },

    // Nível 6 - Sementes
    {
      code: 101101,
      level: 6,
      description: 'SEMENTE DE SOJA',
      parent_id: 1011,
      type: 'receita',
    },
    {
      code: 101102,
      level: 6,
      description: 'SEMENTE DE MILHO',
      parent_id: 1011,
      type: 'receita',
    },
    {
      code: 101103,
      level: 6,
      description: 'SEMENTE DE SORGO',
      parent_id: 1011,
      type: 'receita',
    },
    {
      code: 101104,
      level: 6,
      description: 'SEMENTE DE ARROZ',
      parent_id: 1011,
      type: 'receita',
    },
    {
      code: 101105,
      level: 6,
      description: 'GRAO DE MILHETO',
      parent_id: 1011,
      type: 'receita',
    },

    // Nível 4 - Receita Grão
    {
      code: 1012,
      level: 4,
      description: 'RECEITA GRÃO',
      parent_id: 101,
      type: 'receita',
    },

    // Nível 6 - Grãos
    {
      code: 101201,
      level: 6,
      description: 'SOJA',
      parent_id: 1012,
      type: 'receita',
    },
    {
      code: 101202,
      level: 6,
      description: 'MILHO',
      parent_id: 1012,
      type: 'receita',
    },
    {
      code: 101207,
      level: 6,
      description: 'FEIJÃO',
      parent_id: 1012,
      type: 'receita',
    },
    {
      code: 101208,
      level: 6,
      description: 'SORGO',
      parent_id: 1012,
      type: 'receita',
    },
    {
      code: 101209,
      level: 6,
      description: 'MILHETO',
      parent_id: 1012,
      type: 'receita',
    },

    // Nível 4 - Prestação de Serviço
    {
      code: 1014,
      level: 4,
      description: 'PRESTACAO DE SERVIÇO',
      parent_id: 101,
      type: 'receita',
    },

    // Nível 6 - Serviços
    {
      code: 101691,
      level: 6,
      description: 'ARMAZENAGEM',
      parent_id: 1014,
      type: 'receita',
    },
    {
      code: 101692,
      level: 6,
      description: 'TRANSPORTE',
      parent_id: 1014,
      type: 'receita',
    },
    {
      code: 101404,
      level: 6,
      description: 'OUTROS SERVIÇOS',
      parent_id: 1014,
      type: 'receita',
    },

    // Nível 4 - Outras Entradas Operacionais
    {
      code: 1016,
      level: 4,
      description: 'OUTRAS ENTRADAS OPERACIONAIS',
      parent_id: 101,
      type: 'receita',
    },

    // Nível 6 - Outras Entradas
    {
      code: 101602,
      level: 6,
      description: 'VENDA DE IMOBILIZADO',
      parent_id: 1016,
      type: 'receita',
    },
    {
      code: 101604,
      level: 6,
      description: 'OUTRAS ENTRADAS OPERACIONAIS',
      parent_id: 1016,
      type: 'receita',
    },
    {
      code: 101605,
      level: 6,
      description: 'ADIANTAMENTO CLIENTES',
      parent_id: 1016,
      type: 'receita',
    },
    {
      code: 101607,
      level: 6,
      description: 'ADIANTAMENTO INTERCOMPANY',
      parent_id: 1016,
      type: 'receita',
    },
    {
      code: 101613,
      level: 6,
      description: 'ARRENDAMENTOS A RECEBER',
      parent_id: 1016,
      type: 'receita',
    },

    // Nível 4 - Receita Financeira
    {
      code: 1021,
      level: 4,
      description: 'RECEITA FINANCEIRA',
      parent_id: 101,
      type: 'receita',
    },

    // Nível 6 - Receitas Financeiras
    {
      code: 102101,
      level: 6,
      description: 'RECEBIMENTO DE EMPRÉSTIMOS',
      parent_id: 1021,
      type: 'receita',
    },
    {
      code: 102103,
      level: 6,
      description: 'APORTE, EMPRÉSTIMOS E RECURSOS',
      parent_id: 1021,
      type: 'receita',
    },

    // Nível 4 - Outras Entradas Financeiras
    {
      code: 1022,
      level: 4,
      description: 'OUTRAS ENTRADAS FINANCEIRAS',
      parent_id: 101,
      type: 'receita',
    },

    // Nível 6 - Outras Entradas Financeiras
    {
      code: 102201,
      level: 6,
      description: 'OUTRAS ENTRADAS FINANCEIRAS',
      parent_id: 1022,
      type: 'receita',
    },
    {
      code: 102202,
      level: 6,
      description: 'ALUGUEIS RECEBIDOS',
      parent_id: 1022,
      type: 'receita',
    },
    {
      code: 102204,
      level: 6,
      description: 'CREDITO CONSÓRCIO',
      parent_id: 1022,
      type: 'receita',
    },

    // Nível 4 - Entrada de Investimentos
    {
      code: 1091,
      level: 4,
      description: 'ENTRADA DE INVESTIMENTOS',
      parent_id: 101,
      type: 'receita',
    },

    // Nível 6 - Investimentos
    {
      code: 109101,
      level: 6,
      description: 'RENDIMENTO S/APLICACÕES',
      parent_id: 1091,
      type: 'receita',
    },
    {
      code: 109102,
      level: 6,
      description: 'RESGATE DE APLICAÇÕES',
      parent_id: 1091,
      type: 'receita',
    },
    {
      code: 109106,
      level: 6,
      description: 'TÍTULOS DE CAPITALIZAÇÃO',
      parent_id: 1091,
      type: 'receita',
    },
    {
      code: 109107,
      level: 6,
      description: 'PREVIDENCIA PRIVADA',
      parent_id: 1091,
      type: 'receita',
    },

    // Nível 4 - Movimentações Bancárias
    {
      code: 1101,
      level: 4,
      description: 'MOVIMENTAÇÕES BANCARIAS',
      parent_id: 101,
      type: 'receita',
    },

    // Nível 6 - Movimentações Bancárias
    {
      code: 110101,
      level: 6,
      description: 'CAPTAÇÃO DE EMPRÉSTIMOS',
      parent_id: 1101,
      type: 'receita',
    },
    {
      code: 110102,
      level: 6,
      description: 'CAPTAÇÃO DE FINANCIAMENTO',
      parent_id: 1101,
      type: 'receita',
    },

    // Nível 1 - Saídas
    {
      code: 2,
      level: 1,
      description: 'SAIDA',
      parent_id: null,
      type: 'despesa',
    },

    // Nível 3 - Despesas
    {
      code: 201,
      level: 3,
      description: 'DESPESAS',
      parent_id: 2,
      type: 'despesa',
    },

    // Nível 4 - Pessoas
    {
      code: 2011,
      level: 4,
      description: 'PESSOAS',
      parent_id: 201,
      type: 'despesa',
    },

    // Nível 6 - Pessoas
    {
      code: 201101,
      level: 6,
      description: 'PRO-LABORE',
      parent_id: 2011,
      type: 'despesa',
    },
    {
      code: 201103,
      level: 6,
      description: 'SALARIO',
      parent_id: 2011,
      type: 'despesa',
    },
    {
      code: 201104,
      level: 6,
      description: 'FERIAS',
      parent_id: 2011,
      type: 'despesa',
    },
    {
      code: 201105,
      level: 6,
      description: '1 PARCELA 13',
      parent_id: 2011,
      type: 'despesa',
    },
    {
      code: 201106,
      level: 6,
      description: '2 PARCELA 13',
      parent_id: 2011,
      type: 'despesa',
    },
    {
      code: 201108,
      level: 6,
      description: 'RESCISÃO A PAGAR',
      parent_id: 2011,
      type: 'despesa',
    },
    {
      code: 201109,
      level: 6,
      description: 'ADIANTAMENTO SALARIAL',
      parent_id: 2011,
      type: 'despesa',
    },
    {
      code: 201110,
      level: 6,
      description: 'PLANO DE SAUDE',
      parent_id: 2011,
      type: 'despesa',
    },
    {
      code: 201111,
      level: 6,
      description: 'LANCHES',
      parent_id: 2011,
      type: 'despesa',
    },
    {
      code: 201113,
      level: 6,
      description: 'PLR A PAGAR',
      parent_id: 2011,
      type: 'despesa',
    },
    {
      code: 201114,
      level: 6,
      description: 'INDENIZACAO PROCESSOS TRABALHISTAS',
      parent_id: 2011,
      type: 'despesa',
    },
    {
      code: 201117,
      level: 6,
      description: 'FGTS',
      parent_id: 2011,
      type: 'despesa',
    },
    {
      code: 201118,
      level: 6,
      description: 'GRRF',
      parent_id: 2011,
      type: 'despesa',
    },
    {
      code: 201120,
      level: 6,
      description: 'GRATIFICACOES',
      parent_id: 2011,
      type: 'despesa',
    },
    {
      code: 201121,
      level: 6,
      description: 'DIARIAS',
      parent_id: 2011,
      type: 'despesa',
    },
    {
      code: 201123,
      level: 6,
      description: 'ADIANTAMENTO DE FERIAS',
      parent_id: 2011,
      type: 'despesa',
    },
    {
      code: 201124,
      level: 6,
      description: 'AJUDA DE CUSTO TRANSPORTE',
      parent_id: 2011,
      type: 'despesa',
    },
    {
      code: 201127,
      level: 6,
      description: '13 PRO LABORE',
      parent_id: 2011,
      type: 'despesa',
    },

    // Nível 4 - Fornecedores
    {
      code: 2012,
      level: 4,
      description: 'FORNECEDORES',
      parent_id: 201,
      type: 'despesa',
    },

    // Nível 6 - Fornecedores
    {
      code: 201201,
      level: 6,
      description: 'FORNECEDORES DE INSUMOS',
      parent_id: 2012,
      type: 'despesa',
    },
    {
      code: 201202,
      level: 6,
      description: 'FORNECEDORES DE CALCÁRIO',
      parent_id: 2012,
      type: 'despesa',
    },
    {
      code: 201203,
      level: 6,
      description: 'FORNECEDORES DE ADUBO',
      parent_id: 2012,
      type: 'despesa',
    },
    {
      code: 201204,
      level: 6,
      description: 'FORNECEDORES DE SEMENTE',
      parent_id: 2012,
      type: 'despesa',
    },
    {
      code: 201205,
      level: 6,
      description: 'FORNECEDORES DE QUIMICO',
      parent_id: 2012,
      type: 'despesa',
    },
    {
      code: 201206,
      level: 6,
      description: 'FORNECEDORES DE BIOLOGICO',
      parent_id: 2012,
      type: 'despesa',
    },
    {
      code: 201207,
      level: 6,
      description: 'FORNECEDORES DE NUTRIÇÃO',
      parent_id: 2012,
      type: 'despesa',
    },
    {
      code: 201208,
      level: 6,
      description: 'FORNECEDORES PJ DIVERSOS',
      parent_id: 2012,
      type: 'despesa',
    },

    // Nível 4 - Prestação de Serviços
    {
      code: 2013,
      level: 4,
      description: 'PRESTACAO DE SERVICOS',
      parent_id: 201,
      type: 'despesa',
    },

    // Nível 6 - Serviços
    {
      code: 201301,
      level: 6,
      description: 'PRESTACAO DE SERVICO DE PULVERIZACAO',
      parent_id: 2013,
      type: 'despesa',
    },
    {
      code: 201302,
      level: 6,
      description: 'PRESTACAO DE SERVICO DE COLHEITA',
      parent_id: 2013,
      type: 'despesa',
    },
    {
      code: 201303,
      level: 6,
      description: 'PRESTACAO DE SERVICO DE TRANSPORTE',
      parent_id: 2013,
      type: 'despesa',
    },

    // Nível 4 - Saídas Específicas
    {
      code: 2014,
      level: 4,
      description: 'SAIDAS ESPECIFICAS',
      parent_id: 201,
      type: 'despesa',
    },

    // Nível 6 - Saídas Específicas
    {
      code: 201404,
      level: 6,
      description: 'ARRENDAMENTOS',
      parent_id: 2014,
      type: 'despesa',
    },

    // Nível 4 - Saídas Administrativas/Comerciais
    {
      code: 2015,
      level: 4,
      description: 'SAIDAS ADMINISTRATIVAS/COMERCIAIS',
      parent_id: 201,
      type: 'despesa',
    },

    // Nível 6 - Saídas Administrativas
    {
      code: 201501,
      level: 6,
      description: 'FRETE S/COMPRA',
      parent_id: 2015,
      type: 'despesa',
    },
    {
      code: 201502,
      level: 6,
      description: 'FRETE S/ VENDA',
      parent_id: 2015,
      type: 'despesa',
    },
    {
      code: 201505,
      level: 6,
      description: 'COMUNICACAO E MARKETING',
      parent_id: 2015,
      type: 'despesa',
    },
    {
      code: 201506,
      level: 6,
      description: 'MATERIAIS DIVERSOS',
      parent_id: 2015,
      type: 'despesa',
    },
    {
      code: 201507,
      level: 6,
      description: 'COMBUSTIVEIS E LUBRIFICANTES',
      parent_id: 2015,
      type: 'despesa',
    },
    {
      code: 201509,
      level: 6,
      description: 'SEGUROS',
      parent_id: 2015,
      type: 'despesa',
    },
    {
      code: 201510,
      level: 6,
      description: 'CONSULTORIAS',
      parent_id: 2015,
      type: 'despesa',
    },
    {
      code: 201513,
      level: 6,
      description: 'ADIANTAMENTO FORNECEDOR',
      parent_id: 2015,
      type: 'despesa',
    },
    {
      code: 201514,
      level: 6,
      description: 'ALUGUEIS',
      parent_id: 2015,
      type: 'despesa',
    },
    {
      code: 201515,
      level: 6,
      description: 'CONCESSIONARIAS E TELECOM',
      parent_id: 2015,
      type: 'despesa',
    },
    {
      code: 201516,
      level: 6,
      description: 'GASTOS GERAIS',
      parent_id: 2015,
      type: 'despesa',
    },
    {
      code: 201519,
      level: 6,
      description: 'MULTAS DIVERSAS',
      parent_id: 2015,
      type: 'despesa',
    },
    {
      code: 201520,
      level: 6,
      description: 'CONTRIBUICÕES ASSOCIATIVAS',
      parent_id: 2015,
      type: 'despesa',
    },
    {
      code: 201522,
      level: 6,
      description: 'ASSESSORIA ADM',
      parent_id: 2015,
      type: 'despesa',
    },
    {
      code: 201524,
      level: 6,
      description: 'REGISTRO CARTORIOS',
      parent_id: 2015,
      type: 'despesa',
    },
    {
      code: 201529,
      level: 6,
      description: 'PATROCINIOS',
      parent_id: 2015,
      type: 'despesa',
    },

    // Nível 4 - Tributos e Taxas
    {
      code: 2016,
      level: 4,
      description: 'TRIBUTOS E TAXAS',
      parent_id: 201,
      type: 'despesa',
    },

    // Nível 6 - Tributos
    {
      code: 201610,
      level: 6,
      description: 'IRPF',
      parent_id: 2016,
      type: 'despesa',
    },
    {
      code: 201611,
      level: 6,
      description: 'IPTU',
      parent_id: 2016,
      type: 'despesa',
    },

    // Nível 4 - Despesas Pessoais
    {
      code: 2017,
      level: 4,
      description: 'DESPESAS PESSOAIS',
      parent_id: 201,
      type: 'despesa',
    },

    // Nível 6 - Despesas Pessoais
    {
      code: 201701,
      level: 6,
      description: 'DESPESAS NÃO IDENTIFICADAS',
      parent_id: 2017,
      type: 'despesa',
    },

    // Nível 4 - Despesas Financeiras
    {
      code: 2021,
      level: 4,
      description: 'DESPESAS FINANCEIRAS',
      parent_id: 201,
      type: 'despesa',
    },

    // Nível 6 - Despesas Financeiras
    {
      code: 202101,
      level: 6,
      description: 'JUROS E MULTAS DE FORNECEDORES',
      parent_id: 2021,
      type: 'despesa',
    },
    {
      code: 202102,
      level: 6,
      description: 'DESCONTOS CONCEDIDOS A CLIENTE',
      parent_id: 2021,
      type: 'despesa',
    },
    {
      code: 202105,
      level: 6,
      description: 'IOF',
      parent_id: 2021,
      type: 'despesa',
    },
    {
      code: 202107,
      level: 6,
      description: 'IRRF S/APLICACAO',
      parent_id: 2021,
      type: 'despesa',
    },
    {
      code: 202108,
      level: 6,
      description: 'JUROS S/ LIMITE',
      parent_id: 2021,
      type: 'despesa',
    },

    // Nível 4 - Outras Saídas Financeiras
    {
      code: 2022,
      level: 4,
      description: 'OUTRAS SAIDAS FINANCEIRAS',
      parent_id: 201,
      type: 'despesa',
    },

    // Nível 6 - Outras Saídas Financeiras
    {
      code: 202201,
      level: 6,
      description: 'OUTRAS SAIDAS FINANCEIRAS',
      parent_id: 2022,
      type: 'despesa',
    },
    {
      code: 202202,
      level: 6,
      description: 'CONCESSAO DE EMPRESTIMOS',
      parent_id: 2022,
      type: 'despesa',
    },
    {
      code: 202205,
      level: 6,
      description: 'CONSORCIOS',
      parent_id: 2022,
      type: 'despesa',
    },

    // Nível 4 - Saída de Investimentos
    {
      code: 2091,
      level: 4,
      description: 'SAIDA DE INVESTIMENTOS',
      parent_id: 201,
      type: 'despesa',
    },

    // Nível 6 - Investimentos
    {
      code: 209101,
      level: 6,
      description: 'SAIDAS P/APLICACAO',
      parent_id: 2091,
      type: 'despesa',
    },
    {
      code: 209103,
      level: 6,
      description: 'AQUISICAO DE IMOBILIZADOS',
      parent_id: 2091,
      type: 'despesa',
    },
    {
      code: 209104,
      level: 6,
      description: 'TITULOS DE CAPITALIZACAO',
      parent_id: 2091,
      type: 'despesa',
    },
    {
      code: 209105,
      level: 6,
      description: 'PREVIDENCIA PRIVADA',
      parent_id: 2091,
      type: 'despesa',
    },

    // Nível 3 - Contratos Bancários
    {
      code: 210,
      level: 3,
      description: 'CONTRATOS BANCARIOS',
      parent_id: 2,
      type: 'despesa',
    },

    // Nível 4 - Amortização de Empréstimos
    {
      code: 2102,
      level: 4,
      description: 'AMORTIZACAO DE EMPRESTIMOS FIN',
      parent_id: 210,
      type: 'despesa',
    },

    // Nível 6 - Amortizações
    {
      code: 210201,
      level: 6,
      description: 'PAGAMENTOS DE EMPRESTIMOS',
      parent_id: 2102,
      type: 'despesa',
    },
    {
      code: 210202,
      level: 6,
      description: 'PAGAMENTOS DE FINANCIAMENTO',
      parent_id: 2102,
      type: 'despesa',
    },
    {
      code: 210203,
      level: 6,
      description: 'PAGAMENTOS EMPRESTIMOS TERCEIROS',
      parent_id: 2102,
      type: 'despesa',
    },
    {
      code: 210204,
      level: 6,
      description: 'INSTRUMENTOS FINANCEIROS E DERIVATIVOS',
      parent_id: 2102,
      type: 'despesa',
    },

    // Nível 1 - Conciliação Bancária
    {
      code: 3,
      level: 1,
      description: 'CONCILIACAO BANCARIA',
      parent_id: null,
      type: 'conciliacao',
    },

    // Nível 6 - Transferências (sem níveis 3 e 4 no PDF)
    {
      code: 301101,
      level: 6,
      description: 'TRANSFERENCIAS BANCARIAS - ORI',
      parent_id: 3,
      type: 'conciliacao',
    },
    {
      code: 301102,
      level: 6,
      description: 'TRANSFERENCIAS BANCARIAS - DES',
      parent_id: 3,
      type: 'conciliacao',
    },
    {
      code: 301104,
      level: 6,
      description: 'ESTORNOS',
      parent_id: 3,
      type: 'conciliacao',
    },
    {
      code: 301105,
      level: 6,
      description: 'TARIFAS MANUTENÇAO DA CONTA',
      parent_id: 3,
      type: 'conciliacao',
    },
  ]

  for (const category of categories) {
    await prisma.category.create({
      data: category,
    })
  }
}
