import { Module } from '@nestjs/common';

import { DataAccessService } from './services/data-access.service';
import { DataAccessController } from './controllers/data-access.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ProductsController } from '@/controllers/products.controller';
import { ProductsService } from '@/services/products.service';
import { Articulo } from './entities/articulo.entity';
import { Rubro } from './entities/rubro.entity';
import { Calibre } from './entities/calibre.entity';
import { ListaPrecios } from './entities/lista-precios.entity';

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
    TypeOrmModule.forFeature([Articulo, Rubro, Calibre, ListaPrecios]),
  ],
  controllers: [DataAccessController, ProductsController],
  providers: [DataAccessService, ProductsService],
})
export class AppModule {}
