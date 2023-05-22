import { Injectable } from '@nestjs/common';
import { CreatePlaylistInput } from './dto/create-playlist.input';
import { UpdatePlaylistInput } from './dto/update-playlist.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie, Playlist, User } from 'src/entities';
import { Repository } from 'typeorm';
import { InsertMoviePlaylistInput } from './dto/insert-movie-playlist.input';

@Injectable()
export class PlaylistService {

  constructor(
    @InjectRepository(Playlist) private playlistRepository: Repository<Playlist>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Movie) private movieRepository: Repository<Movie>,
  ) { }

  async addPlaylist(userId: string, createPlaylistInput: CreatePlaylistInput) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const { moviesIds } = createPlaylistInput;

    let movies: Movie[];
    if (moviesIds) {
      const movies = await this.movieRepository.find({ where: moviesIds.map(id => ({ id })) });
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
    const movies = await this.movieRepository.find({
      where: moviesIds.map(id => ({ id })),
    });

    playlist.movies = [...playlist.movies, ...movies];

    return await this.playlistRepository.save(playlist);
  }

  async findPlaylistsByUser(userId: any) {
    return await this.playlistRepository.find({
      where: { user: { id: userId } },
      relations: ['movies'],
    });
  }
}
