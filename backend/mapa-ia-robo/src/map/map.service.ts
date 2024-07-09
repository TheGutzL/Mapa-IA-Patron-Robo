import { Injectable, Logger } from '@nestjs/common';
import { exec } from 'child_process';
import { rename } from 'fs/promises';
import * as path from 'path';
import { promisify } from 'util';
import { MapGateway } from './gateway/map.gateway';
const execAsync = promisify(exec);

@Injectable()
export class MapService {
  constructor(private readonly mapGateway: MapGateway) {}
  private readonly logger = new Logger(MapService.name);

  async getPathToGeneratedHtml(): Promise<string> {
    const destinationPath = path.resolve(
      __dirname,
      '../../public/maps/mapa-predicciones.html',
    );
    return destinationPath;
  }

  async updateMapData(): Promise<void> {
    try {
      const scriptPath = '../../mapa/mapa-predicciones.py';
      const command = `python ${scriptPath}`;

      await execAsync(command);
      this.logger.log('Notebook ejecutado exitosamente');
    } catch (error) {
      this.logger.error('Error al ejecutar el notebook', error);
    }
  }

  async moveGeneratedHtml(): Promise<void> {
    const sourcePath = '../../mapa/build/mapa-predicciones.html';
    const destinationPath = path.join('public/maps/mapa-predicciones.html');
    try {
      await rename(sourcePath, destinationPath);
      this.logger.log('Archivo HTML movido exitosamente');

      this.mapGateway.sendMapUpdate({ message: 'Mapa actualizado' });
    } catch (error) {
      this.logger.error('Error al mover el archivo HTML', error);
    }
  }
}
