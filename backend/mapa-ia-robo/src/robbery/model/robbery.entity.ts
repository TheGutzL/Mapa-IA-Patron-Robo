import * as moment from 'moment';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Coordenadas } from './coordenadas.entity';
import { PreviousCase } from './previous-case.entity';

@Entity()
export class Robbery {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  incidente: string;

  @Column()
  tipoIncidente: string;

  @Column()
  ubicacion: string;

  @Column()
  distrito: string;

  @Column({ type: 'date' })
  fecha: Date;

  @Column()
  hora: string;

  @Column({ length: 500 })
  descripcion: string;

  @OneToMany(() => PreviousCase, (previousCase) => previousCase.robbery, {
    cascade: true,
  })
  casosAnteriores: PreviousCase[];

  @Column({ type: 'json', nullable: true})
  coordenadas: Coordenadas | null;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  convertirFechaFormato() {
    const fechaFormateada = moment(this.fecha).format('YYYY-MM-DD');
    this.fecha = new Date(fechaFormateada);
  }
}
