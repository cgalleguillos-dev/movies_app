import { Module } from '@nestjs/common';
import { GenreService } from './genre.service';
import { GenreResolver } from './genre.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genre } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Genre])],
  providers: [GenreResolver, GenreService]
})
export class GenreModule { }
