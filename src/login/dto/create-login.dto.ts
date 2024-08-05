import { IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class CreateLoginDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    password: string;

    @IsString()
    @IsOptional()
    role?: string;

}
