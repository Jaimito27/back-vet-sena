import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { Transform } from 'class-transformer';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  doc_type?: string;
  @IsNotEmpty()
  @IsOptional()
  ident_document?: string;
  @IsString()
  @IsOptional()
  names?: string;
  @IsString()
  @IsOptional()
  last_name?: string;
  @IsString()
  @IsOptional()
  phone?: string;
  @IsString()
  @IsOptional()
  email?: string;


  @IsString()
  @IsNotEmpty()
  username: string;
  @IsString()
  @IsOptional()
  occupation?: string;

  @IsString()
  @IsOptional()
  role?: string;

  @IsString()
  @IsOptional()
  @IsBoolean()
  state?: boolean;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @Transform(({ value }) => value.trim())
  password: string;

}
