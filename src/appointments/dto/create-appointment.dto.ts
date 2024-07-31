import { IsDate, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class CreateAppointmentDto {
    @Matches(/^\d{2}\/\d{2}\/\d{4}$/)
  @IsNotEmpty()
  date_appointment: string;

  @IsString()
  @MinLength(5)
  @IsNotEmpty()
  type_procedure: string;

  @IsString()
  @IsNotEmpty()
  petId: string;
}


