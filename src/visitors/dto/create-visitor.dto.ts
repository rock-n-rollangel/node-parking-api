import { IsNotEmpty, IsString } from 'class-validator';

export class CreateVisitorDto {
  @IsNotEmpty()
  @IsString()
  number: string;
}
