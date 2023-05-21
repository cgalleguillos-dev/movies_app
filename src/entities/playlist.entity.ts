import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { Movie } from './movie.entity';
import { User } from './user.entity';

@Entity()
@ObjectType()
export class Playlist {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  title: string;

  @Column()
  @Field()
  description: string;

  @Field(
    type => [Movie],
  )
  @ManyToMany(() => Movie)
  @JoinTable()
  movies: Movie[];

  @Field(
    type => User,
  )
  @ManyToOne(() => User, user => user.playlists)
  @JoinTable()
  user: User;
}
