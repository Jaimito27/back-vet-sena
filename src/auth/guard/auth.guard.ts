import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { jwtConstants } from '../constants/jwt.constant';

@Injectable()
export class AuthGuard implements CanActivate {

constructor(
  private readonly jwtService: JwtService
){}

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const request = context.switchToHttp().getRequest() 

    const token = this.extractTokenFromHeader(request)
    if(!token) throw new HttpException('No tienes permiso para ingresar a esta ruta', HttpStatus.UNAUTHORIZED)
    

      try {
        //verifica asincronicamente el token enviado con la plabra secreta
        const payload = await this.jwtService.verifyAsync(token, {secret: jwtConstants.secret})

        request.user = payload
      } catch {
        throw new HttpException('No tienes permiso para ingresar a esta ruta', HttpStatus.UNAUTHORIZED)
      }

    return true;
  
  }

    private extractTokenFromHeader(request: Request): string | undefined{
      //mediante el split separa el token de la palabra bearer y obtiene asi lo datos del token en un arreglo, lo desustructura para que divida los datos por indices
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined
    }
  }

