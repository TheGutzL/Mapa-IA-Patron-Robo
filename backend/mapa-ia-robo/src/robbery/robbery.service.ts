import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GeocodingService } from 'src/geocode/geocoding.service';
import { MapService } from 'src/map/map.service';
import { Repository } from 'typeorm';
import { CreateRobberyDto } from './dto/create-robbery.dto';
import { Robbery } from './model/robbery.entity';

@Injectable()
export class RobberyService {
  constructor(
    @InjectRepository(Robbery)
    private robberyRepository: Repository<Robbery>,
    private geocodingService: GeocodingService,
    private mapService: MapService,
  ) {}

  async findAllRobberies(): Promise<Robbery[]> {
    return await this.robberyRepository.find({
      relations: ['casosAnteriores'],
    });
  }

  async findRobberyById(id: number): Promise<Robbery | null> {
    return await this.robberyRepository.findOne({ where: { id } });
  }

  async createRobbery(robberyData: CreateRobberyDto): Promise<Robbery> {
    const robbery = this.robberyRepository.create(robberyData);

    const geocodeResponse = await this.geocodingService.geocode(
      `${robbery.ubicacion} Ica`,
    );
    const { lat, lon } = geocodeResponse[0];

    if (!robbery.coordenadas) {
      robbery.coordenadas = {
        latitud: parseFloat(lat),
        longitud: parseFloat(lon),
      };
    }

    return await this.robberyRepository.save(robbery);

    // if (savedRobbery) {
    //   await this.mapService.updateMapData()
    //   await this.mapService.moveGeneratedHtml();
    // }
  }

  async createMultipleRobberies(
    robberiesData: CreateRobberyDto[],
  ): Promise<Robbery[]> {
    const robberies = robberiesData.map((robberyData) =>
      this.robberyRepository.create(robberyData),
    );
    return await this.robberyRepository.save(robberies);
  }

  async updateRobbery(
    id: number,
    robberyData: Partial<Robbery>,
  ): Promise<Robbery> {
    await this.robberyRepository.update(id, robberyData);
    return this.findRobberyById(id);
  }

  async deleteRobbery(id: number): Promise<void> {
    await this.robberyRepository.delete(id);
  }
}
