import { Injectable, Logger } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

@Injectable()
export class DataAccessService {
  private readonly logger = new Logger(DataAccessService.name);

  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async searchSellerByCode(code: string) {
    this.logger.log(`Buscando vendedor por código: ${code}`);
    // JOIN con Supervisor para obtener el nombre de la línea/supervisor
    const query = `
      SELECT v.codigo, v.nombre, v.activo, s.Supervisor_Nombre as linea
      FROM Vendedor v
      LEFT JOIN Supervisor s ON v.supervisor_id = s.Supervisor_Id
      WHERE v.codigo = @0
    `;
    try {
      const results = await this.entityManager.query(query, [code]);
      const v = results[0];
      if (v) {
        // Formatear nombre con la línea (supervisor_nombre) si existe
        const lineaStr = v.linea ? ` (${v.linea})` : "";
        return {
          ...v,
          nombre: `${v.nombre}${lineaStr}`
        };
      }
      return null;
    } catch (error) {
      this.logger.error(`Error buscando vendedor: ${error.message}`);
      throw error;
    }
  }

  async searchClientByCode(code: string) {
    this.logger.log(`Buscando cliente por código: ${code}`);
    // Basado en cliente.entity.ts
    const query = `SELECT codigo, razon_social, direccion, localidad FROM Cliente WHERE codigo = @0`;
    try {
      const results = await this.entityManager.query(query, [code]);
      return results[0] || null;
    } catch (error) {
      this.logger.error(`Error buscando cliente: ${error.message}`);
      throw error;
    }
  }
}
