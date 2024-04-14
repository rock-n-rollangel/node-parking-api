import { IsNotEmpty, IsString, Matches } from "class-validator";

export class CreateVisitorDto {
    @IsNotEmpty()
    @IsString()
    number: string;
}
