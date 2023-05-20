import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Actor } from './actor.entity';
import { Playlist } from './playlist.entity';
import { Genre } from './genre.entity';

@Entity()
@ObjectType()
export class Movie {
  @Field()
  @Column(
    {
      primary: true
    }
  )
  id: number;

  @Field()
  @Column()
  adult: boolean;

  @Field()
  @Column()
  backdrop_path: string;

  @Field(
    type => [Genre],
  )
  @JoinTable()
  @ManyToMany(() => Genre)
  genres: Genre[];

  @Field()
  @Column()
  original_language: string;

  @Field()
  @Column()
  original_title: string;

  @Field()
  @Column()
  overview: string;

  @Field(
    type => Float,
  )
  @Column(
    { type: 'float' }
  )
  popularity: number;

  @Field()
  @Column()
  poster_path: string;

  @Field()
  @Column()
  release_date: string;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  video: boolean;

  @Field(
    type => Float,
  )
  @Column(
    { type: 'float' }
  )
  vote_average: number;

  @Field(
    type => Int,
  )
  @Column(
    { type: 'int' }
  )
  vote_count: number;

  @Field(
    type => [Actor],
  )
  @ManyToMany(() => Actor)
  @JoinTable({
    joinColumn: {
      name: 'movie',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'actor',
      referencedColumnName: 'id'
    }
  })
  actors: Actor[];

  genre_ids: number[];
  actor_ids: number[];
}
