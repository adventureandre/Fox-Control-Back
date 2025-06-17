import { Inventory, Prisma } from '@prisma/client'

export interface InventoryRepository {
  create(data: Prisma.InventoryCreateInput): Promise<Inventory>
  findById(id: string): Promise<Inventory | null>
  findInventoryByProducer(producerId: string): Promise<Inventory | null>
  findMany(producerId?: string): Promise<Inventory[]>
  update(id: string, data: Prisma.InventoryUpdateInput): Promise<Inventory>
  delete(id: string): Promise<void>
}
