import {
    IsBoolean,
    IsIn,
    IsNotEmpty,
    IsString,
    MinLength,
  } from 'class-validator';
  
  export class CreatePetDto {
    @IsString()
    @MinLength(2)
    @IsNotEmpty()
    nombre: string;
  
    @IsString()
    @MinLength(1)
    @IsNotEmpty()
    edad: string;
  
    @IsString()
    @IsNotEmpty()
    tipo: string;
  
    @IsString()
    @IsNotEmpty()
    raza: string;
  
    @IsString()
    @IsNotEmpty()
    @IsBoolean()
    peligros: boolean;
  
    @IsString()
    @IsNotEmpty()
    @IsIn(['Macho', 'Hembra']) //solo pueden ingresas estas 2 opciones
    genero: string;
  }
  