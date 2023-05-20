import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class MovieService {

  constructor(
    @InjectRepository(Movie) private movieRepository: Repository<Movie>,
  ) { }

  async findAll() {
    return await this.movieRepository.find({
      relations: ['genres']
    });
  }

  async findOne(id: number) {
    return await this.movieRepository.findOne({
      where: { id }
    })
  }

  async findGenresByMovieId(movieId: number) {
    const movieWithGenres = await this.movieRepository
      .createQueryBuilder('movie')
      .leftJoinAndSelect('movie.genres', 'genre')
      .where('movie.id = :id', { id: movieId })
      .getOne();
    return movieWithGenres.genres;
  }

  async findActorByMovieId(movieId: number) {
    const movieWithActors = await this.movieRepository
      .createQueryBuilder('movie')
      .leftJoinAndSelect('movie.actors', 'actor')
      .where('movie.id = :id', { id: movieId })
      .getOne();

    movieWithActors.actors = movieWithActors.actors.map(actor => {
      if (actor.profile_path === null) {
        actor.profile_path = "";
      }
      return actor;
    })

    movieWithActors.actors.sort((a, b) => {
      return a.order - b.order;
    })

    return movieWithActors.actors;
  }
}
