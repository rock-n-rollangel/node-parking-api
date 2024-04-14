import { Test, TestingModule } from '@nestjs/testing';
import { VisitorsController } from './visitors.controller';
import { VisitorsService } from './visitors.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Visitor } from './entities/visitor.entity';

describe('VisitorsController', () => {
  let controller: VisitorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VisitorsController],
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

    controller = module.get<VisitorsController>(VisitorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
