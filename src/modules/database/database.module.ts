import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { DatabaseController } from './database.controller';
import { Movie, Genre, Actor } from '../../entities';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([Movie, Genre, Actor])],
  controllers: [DatabaseController],
  providers: [DatabaseService]
})
export class DatabaseModule { }
