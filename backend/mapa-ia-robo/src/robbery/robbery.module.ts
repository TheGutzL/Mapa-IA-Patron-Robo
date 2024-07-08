import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MapGateway } from 'src/map/gateway/map.gateway';
import { Robbery } from './model/robbery.entity';
import { RobberyController } from './robbery.controller';
import { RobberyService } from './robbery.service';

@Module({
  imports: [TypeOrmModule.forFeature([Robbery])],
  controllers: [RobberyController],
  providers: [RobberyService, MapGateway],
})
export class RobberyModule {}
