import { IsNotEmpty, IsOptional, IsString, Matches, MinLength } from 'class-validator';

export class UpdateAppointmentDto {
  @Matches(/^\d{2}\/\d{2}\/\d{4}$/)
  @IsNotEmpty()
  date_appointment: string;

  @IsString()
  @MinLength(5)
  @IsOptional()
  type_procedure: string;

  @IsString()
  @IsOptional()
  petId: string;
}
