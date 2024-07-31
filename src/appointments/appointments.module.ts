import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';

import { PetsModule } from '../../src/pets/pets.module';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment]), PetsModule],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
  exports:[TypeOrmModule]
})
export class AppointmentsModule {}
