import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  Max,
  Min,
} from 'class-validator';

export class CreateParkingSpaceDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-z]+[0-1]+$/gi)
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(255)
  width: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(255)
  length: number;
}
