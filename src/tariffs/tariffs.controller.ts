import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { TariffsService } from './tariffs.service';
import { CreateTariffDto } from './dto/create-tariff.dto';
import { UpdateTariffDto } from './dto/update-tariff.dto';
import { TariffsTimeSliceInterceptor } from './tariffs.interceptor';
import { TimeReservedException } from './exceptions/tariffs.exceptions.time-reserved';

@Controller('tariffs')
export class TariffsController {
  constructor(private readonly tariffsService: TariffsService) {}

  @UseInterceptors(TariffsTimeSliceInterceptor)
  @Post()
  async create(@Body() createTariffDto: CreateTariffDto) {
    if (
      await this.tariffsService.hasWithTimeSlice(
        createTariffDto.startAt,
        createTariffDto.endAt,
      )
    ) {
      throw new TimeReservedException();
    }

    return this.tariffsService.create(createTariffDto);
  }

  @Get()
  findAll() {
    return this.tariffsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tariffsService.findOne(+id);
  }

  @UseInterceptors(TariffsTimeSliceInterceptor)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTariffDto: UpdateTariffDto) {
    return this.tariffsService.update(+id, updateTariffDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tariffsService.remove(+id);
  }
}
