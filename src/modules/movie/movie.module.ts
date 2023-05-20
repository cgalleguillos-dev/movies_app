import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieResolver } from './movie.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Actor, Genre, Movie } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, Genre, Actor])],
  providers: [MovieResolver, MovieService]
})
export class MovieModule { }
