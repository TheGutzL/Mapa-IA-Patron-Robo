import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MapGateway } from 'src/map/gateway/map.gateway';
import { Repository } from 'typeorm';
import { CreateRobberyDto } from './dto/create-robbery.dto';
import { Robbery } from './model/robbery.entity';

@Injectable()
export class RobberyService {
  constructor(
    @InjectRepository(Robbery)
    private robberyRepository: Repository<Robbery>,
    private mapGateway: MapGateway,
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
    const savedRobbery = await this.robberyRepository.save(robbery);
    this.mapGateway.sendMapUpdate({
      message: 'New robbery added',
      robbery: savedRobbery,
    });
    return savedRobbery;
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
