import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { PlaylistService } from './playlist.service';
import { Playlist } from '../../entities';
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

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Playlist, { name: 'updatePlaylist' })
  async updatePlaylist(@Context() context, @Args('updatePlaylistInput') updatePlaylistInput: UpdatePlaylistInput) {
    return await this.playlistService.updatePlaylist(updatePlaylistInput);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Playlist, { name: 'removePlaylist' })
  async removePlaylist(@Context() context, @Args('id', { type: () => String }) id: string) {
    return await this.playlistService.removePlaylist(id);
  }
}
