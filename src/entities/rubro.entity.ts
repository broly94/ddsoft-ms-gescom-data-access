import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Articulo } from './articulo.entity';

@Entity('Rubro')
export class Rubro {
  @PrimaryColumn()
  codigo: number;

  @Column()
  descripcion: string;

  @OneToMany(() => Articulo, (articulo) => articulo.rubro)
  articulos: Articulo[];
}
