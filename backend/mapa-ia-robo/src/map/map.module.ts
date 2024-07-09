import { Module } from '@nestjs/common';
import { MapGateway } from './gateway/map.gateway';
import { MapController } from './map.controller';
import { MapService } from './map.service';

@Module({
  imports: [],
  controllers: [MapController],
  providers: [MapGateway, MapService],
  exports: [MapService, MapGateway],
})
export class MapModule {}
