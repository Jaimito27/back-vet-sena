import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}
  async createRoleDefault(role: CreateRoleDto) {
    let roleFound = await this.roleRepository.findOne({
      where: { role: 'user' },
    });

    if (!roleFound) {
      roleFound = this.roleRepository.create({ role: 'user' });
      await this.roleRepository.save(roleFound);
    }

    return roleFound;
  }

  async createNewRole(role: CreateRoleDto):Promise <Role> {
    let roleFound = await this.roleRepository.findOne({where: {role: role.role}});

    if (!roleFound) {
      const newRole = this.roleRepository.create(role);
      await this.roleRepository.save(newRole);
    }

    return roleFound;
  }

  findAll() {
    return `This action returns all role`;
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
