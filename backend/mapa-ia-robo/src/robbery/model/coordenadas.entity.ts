import { Column } from 'typeorm';

export class Coordenadas {
  @Column({ type: 'decimal', precision: 11, scale: 8 })
  latitud: number;

  @Column({ type: 'decimal', precision: 11, scale: 8 })
  longitud: number;
}
