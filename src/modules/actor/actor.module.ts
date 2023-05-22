import { Module } from '@nestjs/common';
import { ActorService } from './actor.service';
import { ActorResolver } from './actor.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Actor } from '../../entities';

@Module({
  imports: [TypeOrmModule.forFeature([Actor])],
  providers: [ActorResolver, ActorService]
})
export class ActorModule { }
