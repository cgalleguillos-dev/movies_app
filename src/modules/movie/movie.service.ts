import { Injectable } from '@nestjs/common';
import { CreateMovieInput } from './dto/create-movie.input';
import { UpdateMovieInput } from './dto/update-movie.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class MovieService {

  constructor(
    @InjectRepository(Movie) private movieRepository: Repository<Movie>,
  ) { }

  create(createMovieInput: CreateMovieInput) {
    return 'This action adds a new movie';
  }

  async findAll() {
    return await this.movieRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} movie`;
  }

  update(id: number, updateMovieInput: UpdateMovieInput) {
    return `This action updates a #${id} movie`;
  }

  remove(id: number) {
    return `This action removes a #${id} movie`;
  }
}
