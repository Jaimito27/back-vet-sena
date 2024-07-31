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
    return await this.appointmentRepository.find({ relations: ['pet'] });
  }

  findOne(id: number) {
    return `This action returns a #${id} appointment`;
  }

  update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    return `This action updates a #${id} appointment`;
  }

  remove(id: number) {
    return `This action removes a #${id} appointment`;
  }
}
