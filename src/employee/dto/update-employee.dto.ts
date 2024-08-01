import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";


export class UpdateEmployeeDto {

    @IsString()
    @IsOptional()
    doc_type?: string;
  
    @IsString()
    @MinLength(4)
    @IsOptional()
    ident_document?: string;
  
    @IsString()
    @IsOptional()
    names?: string;
  
    @IsString()
    @IsOptional()
    last_name?: string;
  
    @IsString()
    @MinLength(5)
    @IsOptional()
    phone?: string;
  
    @IsString()
    @IsOptional()
    @IsEmail()
    email?: string;
  
    @IsString()
    @IsOptional()
    birthdate?: Date;
  
  
    @IsString()
    @IsOptional()
    address?: string;
  
    @IsString()
    @IsOptional()
    occupation?: string;
  
}
