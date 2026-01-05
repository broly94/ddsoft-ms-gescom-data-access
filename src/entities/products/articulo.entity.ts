import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Rubro } from '@/entities/products/rubro.entity';
import { Calibre } from '@/entities/products/calibre.entity';
import { ListaPrecios } from '@/entities/products/lista-precios.entity';

@Entity('Articulo')
export class Articulo {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  codigo: string;

  @Column({ type: 'varchar', length: 255 })
  descripcion: string;

  @Column({
    name: 'Precio_Costo_SDesc',
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  costoSDesc: number;

  @Column({ type: 'int' })
  stock: number;

  @Column({ name: 'uxbcompra', type: 'int' })
  uxbCompra: number;

  @Column({ type: 'int' })
  linea: number;

  @Column({ type: 'bit' })
  Baja: boolean;

  // Relación con Rubro
  @ManyToOne(() => Rubro, (rubro) => rubro.articulos)
  @JoinColumn({ name: 'rubro' }) // 'rubro' es la columna FK en la tabla Articulo
  rubro: Rubro;

  // Relación con Calibre
  @ManyToOne(() => Calibre, (calibre) => calibre.articulos)
  @JoinColumn({ name: 'calibre' }) // 'calibre' es la columna FK en la tabla Articulo
  calibre: Calibre;

  // Relación con ListaPrecios
  @OneToMany(() => ListaPrecios, (listaPrecios) => listaPrecios.articulo)
  precios: ListaPrecios[];
}
