import { Farm, Prisma } from '@prisma/client'

export interface FarmRepository {
  create(data: Prisma.FarmCreateInput): Promise<Farm | null>
  findById(id: string): Promise<Farm | null>
  update(params: { id: string; data: Prisma.FarmUpdateInput }): Promise<Farm>
  delete(id: string): Promise<void>
  getFarmsByProducer(producerId: string, active?: boolean): Promise<Farm[] | []>
  getAllFarms(active?: boolean): Promise<Farm[] | []>
}
