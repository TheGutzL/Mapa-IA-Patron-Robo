import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeocodingModule } from './geocode/geocoding.module';
import { MapModule } from './map/map.module';
import { PreviousCase } from './robbery/model/previous-case.entity';
import { Robbery } from './robbery/model/robbery.entity';
import { RobberyModule } from './robbery/robbery.module';
import { GatewayModule } from './websockets/websocket.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'TheKing',
      database: 'MapaIARobo',
      entities: [Robbery, PreviousCase],
      synchronize: false,
    }),
    RobberyModule,
    GatewayModule,
    MapModule,
    GeocodingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
