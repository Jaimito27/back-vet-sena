import { IsEmail, IsNotEmpty, IsNumber, IsString, Length, MinLength} from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  doc_type: string;
  @IsNumber()
  @Length(5)
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
  @Length(8)
  @IsNotEmpty()
  password: string;
}
