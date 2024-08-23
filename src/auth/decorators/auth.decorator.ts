//unifica los decoradores en uno solo para definirlos en el controlador

import { applyDecorators, UseGuards } from '@nestjs/common';
import { Role } from '../enums/rol.enum';
import { Roles } from './roles.decorator';
import { AuthGuard } from '../guard/auth.guard';
import { RolesGuard } from '../guard/roles.guard';

export function Auth(...roles: Role[]) {//la funcion recibe como parametro el rol el cual tiene permiso para ejecutar el metodo
  return applyDecorators(
    Roles(...roles), //recibe el role, que desde le decorador es pasado com parametro
    UseGuards(AuthGuard, RolesGuard), //Ingreso los guards que se usan para validar
  );
}
