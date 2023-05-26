import { Injectable } from '@nestjs/common';
import { CreatePlaylistInput } from './dto/create-playlist.input';
import { UpdatePlaylistInput } from './dto/update-playlist.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie, Playlist } from '../../entities';
import { Repository } from 'typeorm';
import { InsertMoviePlaylistInput } from './dto/insert-movie-playlist.input';
import { MovieService } from '../movie/movie.service';
import { UserService } from '../user/user.service';

@Injectable()
export class PlaylistService {

  constructor(
    @InjectRepository(Playlist) private playlistRepository: Repository<Playlist>,
    private usersService: UserService,
    private movieService: MovieService,
  ) { }

  async addPlaylist(userId: string, createPlaylistInput: CreatePlaylistInput) {
    const user = await this.usersService.findOne(userId);
    const { moviesIds } = createPlaylistInput;

    let movies: Movie[];
    if (moviesIds) {
      movies = await this.movieService.findMoviesByMoviesIds(moviesIds);
    }
    const playlistData = {
      title: createPlaylistInput.title,
      description: createPlaylistInput.description,
      user: user,
      movies: movies,
    }
    const playlist = this.playlistRepository.create(playlistData);
    return await this.playlistRepository.save(playlist);
  }

  async insertMoviePlaylist(insertMoviePlaylistInput: InsertMoviePlaylistInput) {
    const { playlistId, moviesIds } = insertMoviePlaylistInput;
    const playlist = await this.playlistRepository.findOne({
      where: { id: playlistId },
      relations: ['movies'],
    });
    const movies = await this.movieService.findMoviesByMoviesIds(moviesIds);

    playlist.movies = [...playlist.movies, ...movies];

    return await this.playlistRepository.save(playlist);
  }

  async findPlaylistsByUser(userId: any) {
    return await this.playlistRepository.find({
      where: { user: { id: userId } },
      relations: ['movies'],
    });
  }

  async updatePlaylist(updatePlaylistInput: UpdatePlaylistInput) {
    const { id, title, description, moviesIds } = updatePlaylistInput;
    const playlist = await this.playlistRepository.findOne({
      where: { id },
      relations: ['movies'],
    });

    playlist.title = title;
    playlist.description = description;
    if (moviesIds) {
      const movies = await this.movieService.findMoviesByMoviesIds(moviesIds);
      playlist.movies = movies;
    }

    return await this.playlistRepository.save(playlist);
  }

  async removePlaylist(id: string) {
    const playlist = await this.playlistRepository.findOne({
      where: { id },
      relations: ['movies'],
    });
    if (!playlist) {
      throw new Error(`Playlist not found`);
    }
    return await this.playlistRepository.remove(playlist);
  }
}