import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { LoginModule } from '../../src/login/login.module';
import { RoleModule } from '../../src/role/role.module';

@Module({
  imports: [TypeOrmModule.forFeature([Employee]), LoginModule, RoleModule],
  controllers: [EmployeeController],
  providers: [EmployeeService],
  exports:[TypeOrmModule, EmployeeService]
})
export class EmployeeModule {}
