import { Prisma, Producers } from '@prisma/client'

export interface ProducerRepository {
  create(data: Prisma.ProducersCreateInput): Promise<Producers | null>
  findById(id: string): Promise<Producers | null>
  findByCpf(cpf: string): Promise<Producers | null>
  delete(id: string): Promise<void>
  getProducers(): Promise<Producers[] | []>
  update(params: {
    id: string
    data: Prisma.ProducersUpdateInput
  }): Promise<Producers>
}
