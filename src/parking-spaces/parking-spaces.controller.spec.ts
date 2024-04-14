import { Test, TestingModule } from '@nestjs/testing';
import { ParkingSpacesController } from './parking-spaces.controller';
import { ParkingSpacesService } from './parking-spaces.service';
import { ParkingSpace } from './entities/parking-space.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ParkingSpacesController', () => {
  let controller: ParkingSpacesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParkingSpacesController],
      providers: [
        ParkingSpacesService,
        {
          provide: getRepositoryToken(ParkingSpace),
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ParkingSpacesController>(ParkingSpacesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
