import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { LoginModule } from '../../src/login/login.module';

@Module({
  imports: [TypeOrmModule.forFeature([Employee]), LoginModule],
  controllers: [EmployeeController],
  providers: [EmployeeService],
  exports:[TypeOrmModule]
})
export class EmployeeModule {}
