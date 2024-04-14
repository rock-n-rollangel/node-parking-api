import { Test, TestingModule } from '@nestjs/testing';
import { VisitorsService } from './visitors.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Visitor } from './entities/visitor.entity';

describe('VisitorsService', () => {
  let service: VisitorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VisitorsService,
        {
          provide: getRepositoryToken(Visitor),
          useValue: {
            create: jest.fn(),
            update: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<VisitorsService>(VisitorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
