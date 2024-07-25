import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  doc_type: string;
  @IsNumber()
  @IsNotEmpty()
  ident_document: number;
  @IsString()
  @IsNotEmpty()
  names: string;
  @IsString()
  last_name: string;
  @IsString()
  phone: string;
  @IsString()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}
