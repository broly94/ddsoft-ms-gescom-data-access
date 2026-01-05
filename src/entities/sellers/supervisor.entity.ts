import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Vendedor } from './sellers.entity';

@Entity('Supervisor')
export class Supervisor {
  @PrimaryColumn({ name: 'Supervisor_Id', type: 'integer' })
  supervisor_Id: number;

  @Column({
    name: 'Supervisor_Nombre',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  supervisor_Nombre: string;

  @OneToMany(() => Vendedor, (vendedor) => vendedor.supervisor)
  vendedores: Vendedor[];
}
