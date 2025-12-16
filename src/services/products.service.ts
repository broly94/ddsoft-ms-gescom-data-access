import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Articulo } from '@/entities/articulo.entity';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(
    @InjectRepository(Articulo)
    private readonly articuloRepository: Repository<Articulo>,
  ) {}

  async findAll() {
    this.logger.log('Obteniendo productos desde BD Gescom...');

    const query = this.articuloRepository
      .createQueryBuilder('a')
      .select([
        'a.codigo AS Codigo',
        'a.descripcion AS Descripcion',
        'r.descripcion AS Rubro_Descripcion',
        'a.costoSDesc AS CostoSDesc',
        'lp.precio_neto AS PrecioFinal',
        'a.stock AS Stock',
        'c.descripcion AS Calibre_Descripcion',
        'a.uxbCompra AS UXBCompra',
        'a.linea AS Linea',
      ])
      .leftJoin('a.rubro', 'r')
      .leftJoin('a.calibre', 'c')
      .leftJoin(
        'a.precios',
        'lp',
        'lp.art_codigo = a.codigo AND lp.nro_lista = :nroLista',
        { nroLista: 1 },
      )
      .where('a.Baja = :baja', { baja: 0 })
      .andWhere('a.linea NOT IN (:...lineas)', { lineas: [5, 6, 7] })
      .orderBy('a.codigo', 'ASC');

    try {
      const startTime = Date.now();
      const products = await query.getRawMany();
      const queryTime = Date.now() - startTime;

      this.logger.log(
        `✅ ${products.length} productos obtenidos en ${queryTime}ms`,
      );
      return products;
    } catch (error) {
      this.logger.error('Error obteniendo productos:', error);
      throw error;
    }
  }
}
