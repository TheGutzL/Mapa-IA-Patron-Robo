import { Module } from '@nestjs/common';
import { MapGateway } from './map.gateway';
import { MapController } from './map.controller';
import { MapService } from './map.service';

@Module({
  imports: [],
  controllers: [MapController],
  providers: [MapGateway, MapService],
})
export class MapModule {}
