import { Module } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { PlaylistResolver } from './playlist.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Playlist } from '../../entities';
import { UserModule } from '../user/user.module';
import { MovieModule } from '../movie/movie.module';

@Module({
  imports: [TypeOrmModule.forFeature([Playlist]),
    UserModule, MovieModule],
  providers: [PlaylistResolver, PlaylistService],
  exports: [PlaylistService]
})
export class PlaylistModule { }
