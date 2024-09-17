import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Auth } from '../../src/auth/decorators/auth.decorator';
import { Role } from '../../src/auth/enums/rol.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  @Auth(Role.ADMIN, Role.USER)
  getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  @Get('locked')
  @Auth(Role.ADMIN)
  getUsersLocked(): Promise<User[]> {
    return this.usersService.getUsersLocked();
  }



  @Get('employee')
  @Auth(Role.ADMIN)
  getEmployee(): Promise<User[]> {
    return this.usersService.getEmployee();
  }

  @Get(':id')
  @Auth(Role.ADMIN)
  getOnlyUser(@Param('id') id: string) {
    return this.usersService.getOnlyUser(id);
  }

  @Patch('delete/:id')
@Auth(Role.ADMIN)
  blockUser(@Param('id') id: string) {
    return this.usersService.blockUser(id);
  }


  @Patch('unlock/:id')
  @Auth(Role.ADMIN)
  unlockUser(@Param('id') id: string){
    return this.usersService.unlockUser(id)
  }

  @Patch(':id')
  @Auth(Role.ADMIN, Role.USER)
  async updateUser(@Param('id') id: string, @Body() user: UpdateUserDto) {
    return await this.usersService.updateUser(id, user);
  }



}
