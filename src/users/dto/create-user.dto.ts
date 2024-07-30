import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  doc_type: string;
  @MinLength(4)
  @IsNotEmpty()
  ident_document: string;
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

}
