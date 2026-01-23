import { Module } from '@nestjs/common';

import { DataAccessService } from './services/data-access.service';
import { DataAccessController } from './controllers/data-access.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ProductsController } from '@/controllers/products.controller';
import { ProductsService } from '@/services/products.service';
import { Articulo } from '@/entities/products/articulo.entity';
import { Rubro } from '@/entities/products/rubro.entity';
import { Calibre } from '@/entities/products/calibre.entity';
import { ListaPrecios } from '@/entities/products/lista-precios.entity';
import { SellersService } from '@/services/sellers.service';
import { Vendedor } from '@/entities/sellers/sellers.entity';
import { Supervisor } from '@/entities/sellers/supervisor.entity';
import { SellersController } from '@/controllers/sellers.controller';
import { Cliente } from '@/entities/clients/cliente.entity';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: !ENV ? '.env.development' : `.env.${ENV}`,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: (process.env.GESCOM_DB_TYPE as any) || 'mssql',
      host: process.env.GESCOM_DB_HOST,
      port: parseInt(process.env.GESCOM_DB_PORT || '1433', 10),
      username: process.env.GESCOM_DB_USER,
      password: process.env.GESCOM_DB_PASS,
      database: process.env.GESCOM_DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
      autoLoadEntities: true,
      extra: {
        encrypt: true,
        trustServerCertificate: true,
      },
    }),
    TypeOrmModule.forFeature([
      Articulo,
      Rubro,
      Calibre,
      ListaPrecios,
      Vendedor,
      Supervisor,
      Cliente,
    ]),
  ],
  controllers: [DataAccessController, ProductsController, SellersController],
  providers: [DataAccessService, ProductsService, SellersService],
})
export class AppModule {}
