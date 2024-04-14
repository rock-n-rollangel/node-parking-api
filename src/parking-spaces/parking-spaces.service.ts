import { Body, Injectable } from '@nestjs/common';
import { CreateParkingSpaceDto } from './dto/create-parking-space.dto';
import { UpdateParkingSpaceDto } from './dto/update-parking-space.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParkingSpace } from './entities/parking-space.entity';

@Injectable()
export class ParkingSpacesService {
  constructor(
    @InjectRepository(ParkingSpace)
    private parkingSpacesRepository: Repository<ParkingSpace>,
  ) {}

  create(@Body() createParkingSpaceDto: CreateParkingSpaceDto) {
    const parkingSpace = new ParkingSpace();
    parkingSpace.name = createParkingSpaceDto.name;
    parkingSpace.length = createParkingSpaceDto.length;
    parkingSpace.width = createParkingSpaceDto.width;

    return this.parkingSpacesRepository.save(parkingSpace);
  }

  findAll() {
    return this.parkingSpacesRepository.find();
  }

  findOne(id: number) {
    return this.parkingSpacesRepository.findOneBy({ id: id });
  }

  update(id: number, updateParkingSpaceDto: UpdateParkingSpaceDto) {
    return this.parkingSpacesRepository.update(
      { id: id },
      updateParkingSpaceDto,
    );
  }

  remove(id: number) {
    return this.parkingSpacesRepository.delete({ id: id });
  }

  reserve(id: number) {
    return this.parkingSpacesRepository.update({ id: id }, { state: false });
  }

  free(id: number) {
    return this.parkingSpacesRepository.update({ id: id }, { state: true });
  }
}
