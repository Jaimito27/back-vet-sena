import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PetsModule } from '../../src/pets/pets.module';
import { LoginModule } from '..//../src/login/login.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), LoginModule], //Defino la entidad que se usa en el módulo
  controllers: [UsersController],
  providers: [UsersService],
  exports: [TypeOrmModule, UsersService],
})
export class UsersModule {}
