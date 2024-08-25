import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Auth } from '../../src/auth/decorators/auth.decorator';
import { Role } from '../../src/auth/enums/rol.enum';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  @Auth(Role.ADMIN, Role.USER)
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.createAppointment(createAppointmentDto);
  }

  @Get()
  @Auth(Role.ADMIN, Role.USER, Role.MEDICAL)
  findAll() {
    return this.appointmentsService.getAppointments();
  }

  @Get(':id')
  @Auth(Role.ADMIN, Role.MEDICAL)
  findOne(@Param('id') id: string) {
    return this.appointmentsService.findOne(+id);
  }

  @Patch(':id')
  @Auth(Role.ADMIN, Role.USER)
  rescheduleAppointment(@Param('id') id: string, @Body() updateAppointmentDto: UpdateAppointmentDto) {
    return this.appointmentsService.rescheduleAppointment(id, updateAppointmentDto);
  }

  @Delete(':id')
  @Auth(Role.ADMIN, Role.USER, Role.MEDICAL)
  remove(@Param('id') id: string) {
    return this.appointmentsService.remove(id);
  }
}
