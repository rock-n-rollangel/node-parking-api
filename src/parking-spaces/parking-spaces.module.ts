import { Module } from '@nestjs/common';
import { ParkingSpacesService } from './parking-spaces.service';
import { ParkingSpacesController } from './parking-spaces.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingSpace } from './entities/parking-space.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ParkingSpace])],
  controllers: [ParkingSpacesController],
  providers: [ParkingSpacesService],
})
export class ParkingSpacesModule {}
