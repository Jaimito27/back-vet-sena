import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { InjectRepository } from '@nestjs/typeorm';


import { UsersService } from '../../src/users/users.service';

import { Pet } from './entities/pet.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PetsService {
  constructor(
    //usando los servicios creados

    private readonly usersService: UsersService,

    @InjectRepository(Pet) private petsRepository: Repository<Pet>
  ) {}


  async createPet(pet: CreatePetDto) {
    //verificando que eixsta el usuario al cual relacionar
    const userFound = await this.usersService.getOnlyUser(pet.user_id);

    if (!userFound) {
      return new HttpException('Usuario no existe', HttpStatus.CONFLICT);
    }

    //si existe el usuario, crea la mascota
    const newPet = this.petsRepository.create(pet)
    return await this.petsRepository.save(newPet)
  }

  async getPets() {
    return await this.petsRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} pet`;
  }

  update(id: number, updatePetDto: UpdatePetDto) {
    return `This action updates a #${id} pet`;
  }

  remove(id: number) {
    return `This action removes a #${id} pet`;
  }
}
