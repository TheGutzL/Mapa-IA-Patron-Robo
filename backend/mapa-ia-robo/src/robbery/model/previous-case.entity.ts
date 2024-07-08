import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Robbery } from './robbery.entity';

@Entity()
export class PreviousCase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  fecha: string;

  @Column()
  detalle: string;

  @Column()
  ubicacion: string;

  @ManyToOne(() => Robbery, (robbery) => robbery.casosAnteriores)
  robbery: Robbery;
}
