/* eslint-disable @typescript-eslint/no-explicit-any */
import { FarmRepository } from '@/repositories/farm-repository'
import { Farm } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface UpdateFarmUseCaseRequest {
  id: string
  name?: string
  city?: string
  hectares?: number
  latitude?: number
  longitude?: number
  producer_id?: string
  active?: boolean
}

interface UpdateFarmUseCaseResponse {
  farm: Farm
}

export class UpdateFarmUseCase {
  constructor(private farmRepository: FarmRepository) {}

  async execute({
    id,
    name,
    city,
    hectares,
    latitude,
    longitude,
    producer_id,
    active,
  }: UpdateFarmUseCaseRequest): Promise<UpdateFarmUseCaseResponse> {
    const farm = await this.farmRepository.findById(id)

    if (!farm) {
      throw new ResourceNotFoundError()
    }

    const updateData: any = {}

    if (name !== undefined) updateData.name = name
    if (city !== undefined) updateData.city = city
    if (hectares !== undefined) updateData.hectares = hectares
    if (latitude !== undefined) updateData.latitude = latitude
    if (longitude !== undefined) updateData.longitude = longitude
    if (active !== undefined) updateData.active = active

    if (producer_id !== undefined && producer_id !== farm.producer_id) {
      updateData.producer = {
        connect: {
          id: producer_id,
        },
      }
    }

    const updatedFarm = await this.farmRepository.update({
      id,
      data: updateData,
    })

    return { farm: updatedFarm }
  }
}
