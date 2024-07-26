import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pet } from './entities/pet.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PetsService {
  constructor(
    //usando los servicios creados
    @InjectRepository(Pet)
    private readonly usersService: UsersService,
    private readonly petRepository: Repository<Pet>,
  ) {}


  async createPet(pet: CreatePetDto) {
    //verificando que eixsta el usuario al cual relacionar
    const userFound = await this.usersService.getOnlyUser(pet.user_id);

    if (!userFound) {
      return new HttpException('Usuario no existe', HttpStatus.CONFLICT);
    }

    //si existe el usuario, crea la mascota
    const newPet = this.petRepository.create(pet)
    return await this.petRepository.save(newPet)
  }

  async getPet() {
    return await this.petRepository.find();
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
