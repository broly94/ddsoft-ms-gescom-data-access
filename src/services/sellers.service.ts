import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Vendedor } from '@/entities/sellers/sellers.entity';

@Injectable()
export class SellersService {
  private readonly logger = new Logger(SellersService.name);

  constructor(
    @InjectRepository(Vendedor)
    private readonly vendedorRepository: Repository<Vendedor>,
  ) {}

  async findActiveSellersBySupervisorIds(
    supervisorIds?: number[],
  ): Promise<any[]> {
    this.logger.log(
      `Obteniendo vendedores activos${supervisorIds ? ` para supervisores: ${supervisorIds.join(', ')}` : ''}`,
    );

    try {
      const startTime = Date.now();
      const queryBuilder = this.vendedorRepository
        .createQueryBuilder('vendedor')
        .leftJoin('vendedor.supervisor', 'supervisor')
        .select([
          'vendedor.codigo',
          'vendedor.nombre',
          'vendedor.supervisor_id',
          'vendedor.activo',
          'supervisor.supervisor_Nombre',
        ])
        .where('vendedor.activo = :activo', { activo: true });

      if (supervisorIds && supervisorIds.length > 0) {
        queryBuilder.andWhere('vendedor.supervisor_id IN (:...ids)', { ids: supervisorIds });
      }

      const rawSellers = await queryBuilder.getMany();

      // Mapeamos a un objeto plano para "limpiar" cualquier metadato de TypeORM
      // y relaciones circulares que causan ERR_EMPTY_RESPONSE
      const sellers = rawSellers.map(v => ({
        codigo: v.codigo,
        nombre: v.nombre,
        supervisor_id: v.supervisor_id,
        activo: v.activo,
        supervisor: v.supervisor ? {
          supervisor_Nombre: v.supervisor.supervisor_Nombre
        } : null
      }));

      const queryTime = Date.now() - startTime;
      this.logger.log(
        `✅ ${sellers.length} vendedores procesados en ${queryTime}ms`,
      );
      return sellers;
    } catch (error) {
      this.logger.error('Error obteniendo vendedores:', error);
      throw error;
    }
  }
}
