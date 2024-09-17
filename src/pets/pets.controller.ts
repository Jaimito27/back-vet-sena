import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { Auth } from '../../src/auth/decorators/auth.decorator';
import { Role } from '../../src/auth/enums/rol.enum';

@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Post()
  @Auth(Role.ADMIN, Role.MEDICAL, Role.USER)
  createPet(@Body() pet: CreatePetDto) {
    return this.petsService.createPet(pet);
  }

  @Get()
  @Auth(Role.ADMIN, Role.MEDICAL, Role.USER)
  async getPets() {
    return await this.petsService.getPets();
  }

  @Get(':id')
  @Auth(Role.ADMIN, Role.MEDICAL)
  findOne(@Param('id') id: string) {
    return this.petsService.findOne(id);
  }

  @Patch(':id')
  @Auth(Role.ADMIN, Role.MEDICAL, Role.USER)
  update(@Param('id') id: string, @Body() pet: UpdatePetDto) {
    return this.petsService.updatePet(id, pet);
  }

  @Patch('delete/:id')
  @Auth(Role.ADMIN, Role.MEDICAL, Role.USER)
  blockPet(@Param('id') id: string){
    return this.petsService.blockPet(id)
  }

  @Patch('unlock/:id')
  @Auth(Role.ADMIN, Role.MEDICAL)
  unlockPet(@Param('id') id: string){
    return this.petsService.unlockPet(id);
  }

  

  @Delete(':id')
  @Auth(Role.ADMIN, Role.MEDICAL, Role.USER)
  remove(@Param('id') id: string) {
    return this.petsService.remove(id);
  }
}
