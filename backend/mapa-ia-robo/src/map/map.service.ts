import { Injectable, Logger } from '@nestjs/common';
import { exec } from 'child_process';
import { rename } from 'fs/promises';
import { promisify } from 'util';
const execAsync = promisify(exec);

@Injectable()
export class MapService {
  private readonly logger = new Logger(MapService.name);

  async updateMapData(robberyData: any): Promise<void> {
    try {
      const notebookPath = '../../../../mapa/mapa-predicciones.ipynb';
      const command = `jupyer nbconvert --to notebook --execute ${notebookPath} --output ${notebookPath}`;

      await execAsync(command);
      this.logger.log('Notebook ejecutado exitosamente');
    } catch (error) {
      this.logger.error('Error al ejecutar el notebook', error);
    }
  }

  async moveGeneratedHtml(): Promise<void> {
    const sourcePath = '../../../../mapa/build/mapa-predicciones.html';
    const destinationPath = '';
    try {
      await rename(sourcePath, destinationPath);
      this.logger.log('Archivo HTML movido exitosamente');
    } catch (error) {
      this.logger.error('Error al mover el archivo HTML', error);
    }
  };
}
