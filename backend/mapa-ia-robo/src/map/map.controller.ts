import { Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { MapService } from './map.service';

@Controller('map')
export class MapController {
  constructor(private readonly mapService: MapService) {}

  @Post('update')
  async getLatestMap(@Res() res: Response): Promise<void> {
    try {
      await this.mapService.updateMapData();
      await this.mapService.moveGeneratedHtml();
      res.status(200).send('Mapa actualizado exitosamente');
    } catch (error) {
      res.status(500).send('Error al actualizar el mapa');
    }
  }
}
