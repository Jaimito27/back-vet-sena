import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto  {
  @IsString()
  @IsOptional()
  doc_type?: string;
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  ident_document?: number;
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

}
