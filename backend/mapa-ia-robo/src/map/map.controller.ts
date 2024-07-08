import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { MapService } from './map.service';

@Controller('map')
export class MapController {
  constructor(private readonly mapService: MapService) {}

  @Get()
  async getLatestMap(@Res() res: Response): Promise<void> {
    res.sendFile('maps/latestMap.html', { root: 'public' });
  }
}
