import { IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  doc_type: string;
  @IsNumber()
  @MinLength(5)
  @IsNotEmpty()
  ident_document: number;
  @IsString()
  @IsNotEmpty()
  names: string;
  @IsString()
  last_name: string;
  @IsString()
  @MinLength(10)
  phone: string;
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  password: string;
}
