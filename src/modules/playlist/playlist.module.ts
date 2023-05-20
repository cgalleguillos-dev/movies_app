import { Module } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { PlaylistResolver } from './playlist.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Playlist } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Playlist])],
  providers: [PlaylistResolver, PlaylistService]
})
export class PlaylistModule { }
