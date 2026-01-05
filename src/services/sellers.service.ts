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
    supervisorIds: number[],
  ): Promise<Vendedor[]> {
    this.logger.log(
      `Obteniendo vendedores activos para supervisores: ${supervisorIds.join(
        ', ',
      )}`,
    );

    if (!supervisorIds || supervisorIds.length === 0) {
      this.logger.warn(
        'No se proporcionaron IDs de supervisor. Retornando array vacío.',
      );
      return [];
    }

    try {
      const startTime = Date.now();
      const sellers = await this.vendedorRepository
        .createQueryBuilder('vendedor')
        .leftJoin('vendedor.supervisor', 'supervisor')
        .select([
          'vendedor.codigo',
          'vendedor.nombre',
          'vendedor.supervisor_id',
          'vendedor.activo',
          'supervisor.supervisor_Nombre',
        ])
        .where('vendedor.supervisor_id IN (:...ids)', { ids: supervisorIds })
        .andWhere('vendedor.activo = :activo', { activo: true })
        .getMany();

      const queryTime = Date.now() - startTime;
      this.logger.log(
        `✅ ${sellers.length} vendedores obtenidos en ${queryTime}ms`,
      );
      return sellers;
    } catch (error) {
      this.logger.error('Error obteniendo vendedores:', error);
      throw error;
    }
  }
}
