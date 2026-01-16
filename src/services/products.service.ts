import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Articulo } from '@/entities/products/articulo.entity';

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
        'lp1.precio_neto AS PrecioFinal',
        'lp3.precio_neto AS InteriorPrecioFinal',
        'a.stock AS Stock',
        'c.descripcion AS Calibre_Descripcion',
        'a.uxbCompra AS UXBCompra',
        'a.linea AS Linea',
      ])
      .leftJoin('a.rubro', 'r')
      .leftJoin('a.calibre', 'c')
      // JOIN para Lista 1 (Precio Final)
      .leftJoin(
        'a.precios',
        'lp1',
        'lp1.art_codigo = a.codigo AND lp1.nro_lista = :nroLista1',
        { nroLista1: 1 },
      )
      // JOIN para Lista 3 (Interior Precio Final)
      .leftJoin(
        'a.precios',
        'lp3',
        'lp3.art_codigo = a.codigo AND lp3.nro_lista = :nroLista3',
        { nroLista3: 3 },
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
