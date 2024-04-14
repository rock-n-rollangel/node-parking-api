import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VisitorsModule } from './visitors/visitors.module';
import { DataSource } from 'typeorm';
import { Visitor } from './visitors/entities/visitor.entity';
import { ParkingSpacesModule } from './parking-spaces/parking-spaces.module';
import { ParkingSpace } from './parking-spaces/entities/parking-space.entity';
import { TariffsModule } from './tariffs/tariffs.module';
import { Tariff } from './tariffs/entities/tariff.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './config/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        database: configService.get<string>('database.name'),
        username: configService.get<string>('database.user'),
        password: configService.get<string>('database.password'),
        entities: [Visitor, ParkingSpace, Tariff],
        synchronize: true,
      }),
    }),
    VisitorsModule,
    ParkingSpacesModule,
    TariffsModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
