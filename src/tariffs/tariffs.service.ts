import { Injectable } from '@nestjs/common';
import { CreateTariffDto } from './dto/create-tariff.dto';
import { UpdateTariffDto } from './dto/update-tariff.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tariff } from './entities/tariff.entity';
import { TimeReservedException } from './exceptions/tariffs.exceptions.time-reserved';
import { TimeHelper } from 'src/helpers/time.helper';

@Injectable()
export class TariffsService {
  constructor(
    @InjectRepository(Tariff)
    private tariffsRepository: Repository<Tariff>,
  ) {}

  async create(createTariffDto: CreateTariffDto) {
    const timeSlice = {
      startAt: TimeHelper.getSecondsFromTime(createTariffDto.startAt),
      endAt: TimeHelper.getSecondsFromTime(createTariffDto.endAt),
    };

    if (await this.hasWithTimeSlice(timeSlice.startAt, timeSlice.endAt)) {
      throw new TimeReservedException();
    }

    const tariff = new Tariff();
    tariff.startAt = timeSlice.startAt;
    tariff.endAt = timeSlice.endAt;
    tariff.price = createTariffDto.price;
    tariff.default = createTariffDto.default ? true : false;

    return this.tariffsRepository.save(tariff);
  }

  findAll() {
    return this.tariffsRepository.find();
  }

  findOne(id: number) {
    return this.tariffsRepository.findOneBy({ id: id });
  }

  async update(id: number, updateTariffDto: UpdateTariffDto) {
    const tariff = await this.findOne(id);
    const timeSlice = {
      startAt: tariff.startAt,
      endAt: tariff.endAt,
    };

    if (updateTariffDto.startAt) {
      timeSlice.startAt = TimeHelper.getSecondsFromTime(
        updateTariffDto.startAt,
      );
    }

    if (updateTariffDto.endAt) {
      timeSlice.endAt = TimeHelper.getSecondsFromTime(updateTariffDto.endAt);
    }

    if (
      timeSlice.startAt !== tariff.startAt ||
      timeSlice.endAt !== tariff.endAt
    ) {
      if (await this.hasWithTimeSlice(timeSlice.startAt, timeSlice.endAt)) {
        throw new TimeReservedException();
      }
    }

    return this.tariffsRepository.update(
      { id: id },
      {
        ...updateTariffDto,
        ...timeSlice,
      },
    );
  }

  remove(id: number) {
    return this.tariffsRepository.delete({ id: id });
  }

  async hasWithTimeSlice(startAt: number, endAt: number): Promise<boolean> {
    const tariffExists = await this.tariffsRepository
      .createQueryBuilder()
      .from(Tariff, 'tariffs')
      .where('tariffs.startAt < :endAt and tariffs.endAt > :startAt', {
        startAt: startAt,
        endAt: endAt,
      })
      .orWhere('tariffs.startAt >= :startAt and tariffs.endAt <= :endAt', {
        startAt: startAt,
        endAt: endAt,
      })
      .getExists();

    return tariffExists;
  }
}
