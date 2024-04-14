import { Injectable } from '@nestjs/common';
import { CreateTariffDto } from './dto/create-tariff.dto';
import { UpdateTariffDto } from './dto/update-tariff.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tariff } from './entities/tariff.entity';
import { TimeHelper } from 'src/helpers/time.helper';
import { PartialType } from '@nestjs/mapped-types';

@Injectable()
export class TariffsService {
  constructor(
    @InjectRepository(Tariff)
    private tariffsRepository: Repository<Tariff>,
  ) {}

  create(createTariffDto: CreateTariffDto) {
    const tariff = new Tariff();
    tariff.startAt = createTariffDto.startAt;
    tariff.endAt = createTariffDto.endAt;
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

  update(id: number, updateTariffDto: UpdateTariffDto) {
    return this.tariffsRepository.update({ id: id }, updateTariffDto);
  }

  remove(id: number) {
    return this.tariffsRepository.delete({ id: id });
  }

  async hasWithTimeSlice(
    startAt: number,
    endAt: number,
  ): Promise<boolean> {
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
