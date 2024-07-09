import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { GeocodingController } from './geocoding.controller';
import { GeocodingService } from './geocoding.service';

@Module({
  imports: [HttpModule],
  providers: [GeocodingService],
  controllers: [GeocodingController],
  exports: [GeocodingService],
})
export class GeocodingModule {}
