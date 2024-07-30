import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../../src/role/entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  controllers: [LoginController],
  providers: [LoginService],
  exports: [TypeOrmModule]
})
export class LoginModule {}
