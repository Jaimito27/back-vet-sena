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
  name: string;

  @IsString()
  @MinLength(1)
  @IsNotEmpty()
  age: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  breed: string;

  @IsNotEmpty()
  @IsBoolean()
  dangerous: boolean;

  @IsNotEmpty()
  @IsString()
  ident_document: string; 

  @IsString()
  @IsNotEmpty()
  @IsIn(['Macho', 'Hembra']) //solo pueden ingresas estas 2 opciones
  gender: string;
}
