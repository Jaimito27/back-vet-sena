import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../enums/rol.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  //el reflector permite leer los metadatos de los controladores
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const role = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    //en caso de que el decorador no tenga metadata, no devuelva undefinen sino un true
    if (!role) return true;

    //extrae el user del conext get header

    const request = context.switchToHttp().getRequest();
    const user = request.user;

     // Verifica que `user` y `user.roles` están definidos
     if (!user || !user.role) {
      console.error('User or user.roles is undefined:', { user });
      return false; // Denegar acceso si no hay usuario o roles
    }
    console.log('Roles permitidos:', role);
    console.log('Rol del usuario:', user.role);

    // retorna el role del usuario para veirficar si el usuario logueado tiene el rol para entrar a la ruta, si no es el mismo rol, no lo deja ingresar
    return role.includes(user.role as Role);
    // role.some((role) => user.roles.includes(role));
    // return role === user.role;
  }
}
