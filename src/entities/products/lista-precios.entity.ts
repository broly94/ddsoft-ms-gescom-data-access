import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Articulo } from '@/entities/products/articulo.entity';

@Entity('ListaPrecios')
export class ListaPrecios {
  // Asumo una clave primaria compuesta basada en la consulta
  @PrimaryColumn({ name: 'art_codigo' })
  art_codigo: string;

  @PrimaryColumn({ name: 'nro_lista' })
  nro_lista: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio_neto: number;

  @ManyToOne(() => Articulo, (articulo) => articulo.precios)
  @JoinColumn({ name: 'art_codigo', referencedColumnName: 'codigo' })
  articulo: Articulo;
}
