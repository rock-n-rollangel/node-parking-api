import { Test, TestingModule } from '@nestjs/testing';
import { ParkingSpacesService } from './parking-spaces.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ParkingSpace } from './entities/parking-space.entity';

describe('ParkingSpacesService', () => {
  let service: ParkingSpacesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<ParkingSpacesService>(ParkingSpacesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
