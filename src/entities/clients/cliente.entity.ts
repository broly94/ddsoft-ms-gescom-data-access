import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('Cliente')
export class Cliente {
  @PrimaryColumn({ name: 'codigo', type: 'int' })
  codigo: number;

  @Column({ name: 'razon_social', type: 'varchar', length: 150 })
  razon_social: string;

  @Column({ name: 'direccion', type: 'varchar', length: 200, nullable: true })
  direccion: string;

  @Column({ name: 'localidad', type: 'varchar', length: 100, nullable: true })
  localidad: string;
}
