
import { IsIn, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdatePetDto {
    @IsString()
    @MinLength(2)
    @IsOptional()
    name: string;
  
    @IsString()
    @MinLength(1)
    @IsOptional()
    age: string;
  
    @IsString()
    @IsOptional()
    type: string;
  
    @IsString()
    @IsOptional()
    breed: string;
  
    @IsNotEmpty()
    @IsOptional()
    dangerous: boolean;
  
  
    @IsString()
    @IsOptional()
    @IsIn(['Macho', 'Hembra']) //solo pueden ingresas estas 2 opciones
    gender: string;
}
