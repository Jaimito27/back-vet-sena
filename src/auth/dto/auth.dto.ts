import { Transform } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class AuthDto{

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value.trim())
    password: string;
}