import { IsDate, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateAppointmentDto {
  @IsDate()
  @IsNotEmpty()
  date_appointment: Date;

  @IsString()
  @MinLength(5)
  @IsNotEmpty()
  type_procedure: string;
}
