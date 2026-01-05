import { Column, Entity, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import { Supervisor } from '@/entities/sellers/supervisor.entity';

@Entity('Vendedor')
export class Vendedor {
  @PrimaryColumn({ type: 'smallint', nullable: false })
  codigo: number;

  @Column({ name: 'nombre', type: 'varchar', length: 50 })
  nombre: string;

  @Column({ name: 'supervisor_id', type: 'int', nullable: true })
  supervisor_id: number;

  @ManyToOne(() => Supervisor, (supervisor) => supervisor.vendedores)
  @JoinColumn({ name: 'supervisor_id', referencedColumnName: 'supervisor_Id' })
  supervisor: Supervisor;

  @Column({ type: 'bit', nullable: false })
  activo: boolean;
}
