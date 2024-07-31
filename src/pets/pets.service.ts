import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { InjectRepository } from '@nestjs/typeorm';


import { Pet } from './entities/pet.entity';
import { Repository } from 'typeorm';
import { User } from '.././users/entities/user.entity';
import { UsersService } from '../../src/users/users.service';

@Injectable()
export class PetsService {
  constructor(
    //usando los servicios creados

    private readonly usersService: UsersService,

    @InjectRepository(Pet) private petsRepository: Repository<Pet>,
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
    return this.petsRepository.save(newPet)

  }

  async getPets() {
    return await this.petsRepository.find({ relations: ['owner', 'appointments'] });
  }

  async findOne(id: string) {
    return await this.petsRepository.findOneBy({id} );
  }

  async updatePet(id: string, pet: UpdatePetDto) {
    const petFound = await this.petsRepository.findOneBy({id})

    if(!petFound){
      return new HttpException('Mascota no existe', HttpStatus.NOT_FOUND)
    }

    const updatePet = Object.assign(petFound, pet) 
  
    return await this.petsRepository.save(updatePet)
  
  }

  remove(id: string) {
    return this.petsRepository.delete({id});
  }
}
