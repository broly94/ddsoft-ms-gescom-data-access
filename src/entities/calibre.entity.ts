import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Articulo } from './articulo.entity';

@Entity('Calibre')
export class Calibre {
  @PrimaryColumn()
  codigo: number;

  @Column()
  descripcion: string;

  @OneToMany(() => Articulo, (articulo) => articulo.calibre)
  articulos: Articulo[];
}
