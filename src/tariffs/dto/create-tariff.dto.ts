import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Max,
} from 'class-validator';
import { TimeHelper } from 'src/helpers/time.helper';

export class CreateTariffDto {
  @IsNotEmpty()
  @IsString()
  @Matches(TimeHelper.regex)
  startAt: string;

  @IsNotEmpty()
  @IsString()
  @Matches(TimeHelper.regex)
  endAt: string;

  @IsNotEmpty()
  @IsNumber()
  @Max(Number.MAX_SAFE_INTEGER)
  price: number;

  @IsOptional()
  @IsBoolean()
  default: boolean;
}
