import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Robbery } from './model/robbery.entity';
import { RobberyController } from './robbery.controller';
import { RobberyService } from './robbery.service';
import { MapGateway } from 'src/map/map.gateway';
import { MapModule } from 'src/map/map.module';

@Module({
  imports: [TypeOrmModule.forFeature([Robbery])],
  controllers: [RobberyController],
  providers: [RobberyService, MapGateway],
})
export class RobberyModule {}
