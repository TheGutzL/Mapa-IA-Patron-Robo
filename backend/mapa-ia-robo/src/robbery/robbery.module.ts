import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MapGateway } from 'src/map/gateway/map.gateway';
import { Robbery } from './model/robbery.entity';
import { RobberyController } from './robbery.controller';
import { RobberyService } from './robbery.service';
import { GeocodingModule } from 'src/geocode/geocoding.module';
import { MapService } from 'src/map/map.service';
import { MapModule } from 'src/map/map.module';

@Module({
  imports: [TypeOrmModule.forFeature([Robbery]), GeocodingModule, MapModule],
  controllers: [RobberyController],
  providers: [RobberyService, MapService],
})
export class RobberyModule {}
