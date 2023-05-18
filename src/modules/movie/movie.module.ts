import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieResolver } from './movie.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Movie])],
  providers: [MovieResolver, MovieService]
})
export class MovieModule { }
