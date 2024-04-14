import { Test, TestingModule } from '@nestjs/testing';
import { TariffsService } from './tariffs.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Tariff } from './entities/tariff.entity';
import { Repository } from 'typeorm';
import { CreateTariffDto } from './dto/create-tariff.dto';

describe('TariffsService', () => {
  let service: TariffsService;
  let tariffsRepository: Repository<Tariff>;

  const REPOSITORY_TOKEN = getRepositoryToken(Tariff);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TariffsService,
        {
          provide: REPOSITORY_TOKEN,
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TariffsService>(TariffsService);
    tariffsRepository = module.get<Repository<Tariff>>(REPOSITORY_TOKEN);
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('repository should be defined', () => {
    expect(tariffsRepository).toBeDefined();
  });

  describe('Tariff create', () => {
    it('should create tariff', async () => {
      const data: CreateTariffDto = new CreateTariffDto();
      data.startAt = '00:00';
      data.endAt = '01:00';
      data.price = 1000;

      await service.create(data);
    });
  });
});
