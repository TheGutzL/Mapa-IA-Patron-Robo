import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Robbery } from './model/robbery.entity';
import { RobberyService } from './robbery.service';
import { CreateRobberyDto } from './dto/create-robbery.dto';

@Controller('robbery')
export class RobberyController {
  constructor(private readonly robberyService: RobberyService) {}

  @Get()
  async findAll(): Promise<Robbery[]> {
    return this.robberyService.findAllRobberies();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Robbery> {
    return this.robberyService.findRobberyById(id);
  }

  @Post()
  async create(@Body() robberyData: CreateRobberyDto): Promise<Robbery> {
    return this.robberyService.createRobbery(robberyData);
  }

  @Post('create-multiple')
  async createMultipleRobberies(
    @Body() robberiesData: CreateRobberyDto[],
  ): Promise<Robbery[]> {
    return await this.robberyService.createMultipleRobberies(robberiesData);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() robberyData: Partial<Robbery>,
  ): Promise<Robbery> {
    return this.robberyService.updateRobbery(id, robberyData);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.robberyService.deleteRobbery(id);
  }
}
