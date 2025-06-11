import { Immobilized, Prisma } from '@prisma/client'

export interface ImmobilizedRepository {
  findById(id: string): Promise<Immobilized | null>
  findByUserProducer(producerId: string): Promise<Immobilized | null>
  findMany(producerId?: string): Promise<Immobilized[]>
  create(data: Prisma.ImmobilizedCreateInput): Promise<Immobilized>
  update(params: {
    id: string
    data: Prisma.ImmobilizedUpdateInput
  }): Promise<Immobilized>
  delete(id: string): Promise<void>
}
