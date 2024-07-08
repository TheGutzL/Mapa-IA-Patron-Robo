import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GatewayModule } from './websockets/websocket.module';
import { RobberyModule } from './robbery/robbery.module';
import { Robbery } from './robbery/model/robbery.entity';
import { PreviousCase } from './robbery/model/previous-case.entity';
import { MapModule } from './map/map.module';

@Module({
  imports: [
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
    MapModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
