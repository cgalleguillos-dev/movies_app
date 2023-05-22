import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { PlaylistService } from './playlist.service';
import { Playlist } from 'src/entities';
import { CreatePlaylistInput } from './dto/create-playlist.input';
import { UpdatePlaylistInput } from './dto/update-playlist.input';
import { Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { InsertMoviePlaylistInput } from './dto/insert-movie-playlist.input';

@Resolver(() => Playlist)
export class PlaylistResolver {
  constructor(private readonly playlistService: PlaylistService) { }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Playlist, { name: 'addPlaylist' })
  async addPlaylist(@Context() context, @Args('createPlaylistInput') createPlaylistInput: CreatePlaylistInput) {
    const userId = context.req.user.id;
    return await this.playlistService.addPlaylist(userId, createPlaylistInput);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Playlist, { name: 'insertMoviePlaylist' })
  async insertMoviePlaylist(@Context() context, @Args('insertMoviePlaylistInput') insertMoviePlaylistInput: InsertMoviePlaylistInput) {
    return await this.playlistService.insertMoviePlaylist(insertMoviePlaylistInput);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [Playlist], { name: 'playlistsByUser' })
  async findPlaylistsByUser(@Context() context) {
    const userId = context.req.user.id;
    return await this.playlistService.findPlaylistsByUser(userId);
  }
}
