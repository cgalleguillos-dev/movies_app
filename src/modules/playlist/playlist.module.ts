import { Module } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { PlaylistResolver } from './playlist.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie, Playlist, User } from '../../entities';

@Module({
  imports: [TypeOrmModule.forFeature([Playlist, User, Movie])],
  providers: [PlaylistResolver, PlaylistService]
})
export class PlaylistModule { }
