//unifica los decoradores en uno solo para definirlos en el controlador

import { applyDecorators, UseGuards } from '@nestjs/common';
import { Role } from '../enums/rol.enum';
import { Roles } from './roles.decorator';
import { AuthGuard } from '../guard/auth.guard';
import { RolesGuard } from '../guard/roles.guard';

export function Auth(...role: Role[]) {// se usa en tipo tupla, para poder admitir en el decorador más de un rol
  return applyDecorators(
    Roles(...role), //recibe el role, que desde le decorador es pasado com parametro
    UseGuards(AuthGuard, RolesGuard), //Ingreso los guards que se usan para validar
  );
}
