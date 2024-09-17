import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { Repository } from 'typeorm';
import { PetsService } from '../../src/pets/pets.service';
import { Pet } from '../../src/pets/entities/pet.entity';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    private readonly petService: PetsService,
  ) {}

  async createAppointment(appointment: CreateAppointmentDto) {
    const newAppointment = this.appointmentRepository.create(appointment);

    if (appointment.petId) {
      const petFound = await this.petService.findOne(appointment.petId);

      if (petFound instanceof Pet) {
        newAppointment.pet = petFound;
      } else {
        if (!petFound)
          return new HttpException('No existe mascota', HttpStatus.NOT_FOUND);
      }
    }
    return this.appointmentRepository.save(newAppointment);
  }

  async getAppointments() {
    return await this.appointmentRepository.find({ relations: ['pet', 'pet.user'] });
  }



  async rescheduleAppointment(
    id: string,
    updateAppointment: UpdateAppointmentDto,
  ) {
    return await this.appointmentRepository.update(id, updateAppointment);
  }

  async cancelAppointment(id: string) {
    const appointmentFound = await this.appointmentRepository.findOne({
      where: { id },
    });

    appointmentFound.state = false;

    return await this.appointmentRepository.save(appointmentFound);
  }

  async activeAppointments() {
    return await this.appointmentRepository.find({
      where: { state: true },
      relations: ['pet', 'pet.user'],
    });
  }


}
