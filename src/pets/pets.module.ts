import { Module } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsController } from './pets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from './entities/pet.entity';
import { UsersModule } from '../../src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Pet]), UsersModule],
  controllers: [PetsController],
  providers: [PetsService],
  exports:[TypeOrmModule]
})
export class PetsModule {}
