import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, Max, Min } from "class-validator";
import { TimeHelper } from "src/helpers/time.helper";

export class CreateTariffDto {
    @IsNotEmpty()
    @IsNumber()
    startAt: number;

    @IsNotEmpty()
    @IsNumber()
    endAt: number;

    @IsNotEmpty()
    @IsNumber()
    @Max(Number.MAX_SAFE_INTEGER)
    price: number;

    @IsOptional()
    @IsBoolean()
    default: boolean;
}
