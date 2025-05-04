import { prisma } from '@/lib/prisma'

export async function seedCategories() {
  const categories = [
    { id: 1, code: '1', level: 1, description: 'ENTRADAS', parent_id: null },
    {
      id: 2,
      code: '101',
      level: 3,
      description: 'ENTRADAS OPERACIONAIS',
      parent_id: 1,
    },
    {
      id: 3,
      code: '10101',
      level: 4,
      description: 'VENDAS À VISTA',
      parent_id: 2,
    },
    { id: 4, code: '2', level: 1, description: 'SAÍDAS', parent_id: null },
    {
      id: 5,
      code: '201',
      level: 3,
      description: 'DESPESAS FIXAS',
      parent_id: 4,
    },
  ]

  for (const category of categories) {
    await prisma.category.create({
      data: category,
    })
  }
}
