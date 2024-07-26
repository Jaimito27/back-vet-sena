import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetsModule } from './pets/pets.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456789',
      database: 'vet_db',
      
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      // migrations: [__dirname + '/../db/migrations/*{.ts,.js}'],
      // migrationsTableName: 'migrations',
    }),
    UsersModule,

    PetsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
