import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { InjectRepository } from '@nestjs/typeorm';

import { UsersService } from '../../src/users/users.service';

import { Pet } from './entities/pet.entity';
import { Repository } from 'typeorm';
import { User } from '.././users/entities/user.entity';

@Injectable()
export class PetsService {
  constructor(
    //usando los servicios creados

    private readonly usersService: UsersService,

    @InjectRepository(Pet) private petsRepository: Repository<Pet>,
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async createPet(pet: CreatePetDto) {


    const newPet = this.petsRepository.create(pet);

    if (pet.ident_document) {
     const userFound = await this.usersService.getOnlyUser(pet.ident_document);

    if(userFound instanceof User ){
      newPet.owner = userFound;
    }else{
      return new HttpException('No existe usuario', HttpStatus.NOT_FOUND);
    }

    }

  }

  async getPets() {
    return await this.petsRepository.find({ relations: ['owner'] });
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
