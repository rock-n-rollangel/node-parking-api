import { Test, TestingModule } from '@nestjs/testing';
import { TariffsController } from './tariffs.controller';
import { TariffsService } from './tariffs.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Tariff } from './entities/tariff.entity';

describe('TariffsController', () => {
  let controller: TariffsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TariffsController],
      providers: [
        TariffsService,
        {
          provide: getRepositoryToken(Tariff),
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TariffsController>(TariffsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
