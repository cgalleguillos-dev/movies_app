import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Actor, Genre, Movie } from 'src/entities';
import { Repository } from 'typeorm';


@Injectable()
export class DatabaseService {
  apiKey: string = process.env.API_KEY;
  limitPage: number = parseInt(process.env.LIMIT_PAGES);
  options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${this.apiKey}`
    }
  };

  url: string = 'https://api.themoviedb.org/3';
  movies: Movie[] = [];
  genres: Genre[] = [];
  actors: Actor[] = [];
  constructor(
    @InjectRepository(Movie) private movieRepository: Repository<Movie>,
    @InjectRepository(Genre) private genreRepository: Repository<Genre>,
    @InjectRepository(Actor) private actorRepository: Repository<Actor>,

  ) { }
  async updateDatabase() {
    const existingGenres: Genre[] = await this.genreRepository.find();
    const existingMovies: Movie[] = await this.movieRepository.find();
    await this.getGenres();
    await this.getMovies();

    this.actors = await this.actorRepository.find();


    const newGenres = this.filterNewGenres(this.genres, existingGenres);
    const newMovies = this.filterNewMovies(this.movies, existingMovies);

    for (let movie of newMovies) {
      const genres = this.genres.filter(genre => movie.genre_ids.includes(genre.id));
      movie.genres = genres;
    }

    for (let movie of newMovies) {
      const actors = this.actors.filter(actor => movie.actor_ids.includes(actor.id));
      movie.actors = actors;
    }

    await this.genreRepository.save(newGenres);
    await this.movieRepository.save(newMovies);
    return {

      old: {
        movies: existingMovies.length,
        genres: existingGenres.length
      },
      new: {
        movies: newMovies.length,
        genres: newGenres.length
      }
    }

  }

  private async getMovies() {
    const response = await axios.get(`
      ${this.url}/movie/popular?language=en-US`, this.options);
    const totalPages = this.limitPage ? this.limitPage : response.data.total_pages;
    const movies = response.data.results;
    for (let movie of movies) {
      const actors = await this.getCreditByMovieId(movie.id);
      movie.actor_ids = [];
      movie.actor_ids.push(...actors.map(actor => actor.id));
      await this.saveActorsToDatabase(actors);
    }
    this.movies.push(...response.data.results);
    for (let page = 2; page <= totalPages; page++) {
      await this.getMoviesByPage(page);
    }
  }

  private async getMoviesByPage(page: number) {
    const response = await axios.get(`
      ${this.url}/movie/popular?language=en-US&page=${page}`, this.options);
    const movies = response.data.results;
    for (let movie of movies) {
      const actors = await this.getCreditByMovieId(movie.id);
      movie.actor_ids = [];
      movie.actor_ids.push(...actors.map(actor => actor.id));
      await this.saveActorsToDatabase(actors);
    }
    this.movies.push(...movies);
  }

  private async saveActorsToDatabase(actors: Actor[]) {
    for (let actor of actors) {
      const existingActor = await this.actorRepository.findOne({
        where: { id: actor.id }
      });
      if (!existingActor) {
        await this.actorRepository.save(actor);
      }
    }
  }

  private async getCreditByMovieId(movieId: number): Promise<Actor[]> {
    const response = await axios.get(`
      ${this.url}/movie/${movieId}/credits?language=en-US`, this.options);
    return response.data.cast;
  }

  private async getGenres(): Promise<void> {
    const response = await axios.get(`
      ${this.url}/genre/movie/list?language=en-US`, this.options);
    this.genres.push(...response.data.genres);
  }

  private filterNewMovies(movies: Movie[], existingMovies: Movie[]): Movie[] {
    return movies.filter(movie => !existingMovies.find(existingMovie => existingMovie.id === movie.id));
  }


  private filterNewGenres(genres: Genre[], existingGenres: Genre[]): Genre[] {
    return genres.filter(genre => !existingGenres.find(existingGenre => existingGenre.id === genre.id));
  }

}
