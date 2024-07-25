import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], //Defino la entidad que se usa en el módulo
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
