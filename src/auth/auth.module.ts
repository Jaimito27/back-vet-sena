import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { LoginModule } from '../../src/login/login.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/jwt.constant';
import { UsersModule } from '../../src/users/users.module';
import { EmployeeModule } from '../../src/employee/employee.module';

@Module({
  imports:[
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
   LoginModule,UsersModule, EmployeeModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
