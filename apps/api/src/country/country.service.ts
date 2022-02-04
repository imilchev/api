import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { Country } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'
import { CreateCountryDto } from './dto/create-country.dto'
import { UpdateCountryDto } from './dto/update-country.dto'

@Injectable()
export class CountryService {
  constructor(private prisma: PrismaService) {}

  async create(inputDto: CreateCountryDto): Promise<Country> {
    return await this.prisma.country.create({ data: inputDto })
  }

  async listCountries(): Promise<Country[]> {
    return await this.prisma.country.findMany()
  }

  async getCountryById(id: string): Promise<Country> {
    try {
      const country = await this.prisma.country.findFirst({
        where: {
          id: id,
        },
        rejectOnNotFound: true,
      })
      return country
    } catch (err) {
      const msg = 'No Country record with ID: ' + id

      Logger.warn(msg)
      throw new NotFoundException(msg)
    }
  }

  update(id: number, updateCountryDto: UpdateCountryDto) {
    return `This action updates a #${id} country`
  }

  async removeCountryById(id: string): Promise<Country> {
    try {
      return await this.prisma.country.delete({
        where: { id },
      })
    } catch (err) {
      const msg = 'Delete failed. No country record found with ID: ' + id

      Logger.warn(msg)
      throw new NotFoundException(msg)
    }
  }
}
