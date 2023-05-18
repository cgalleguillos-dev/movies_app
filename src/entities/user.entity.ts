import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Playlist } from './playlist.entity';

@Entity(
  { name: 'users' }
)
@ObjectType()
export class User {

  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  email: string;

  @Column()
  @Field()
  password: string;

  @Field(
    type => [Playlist],
  )
  @OneToMany(() => Playlist, playlist => playlist.user)
  playlists: Playlist[];

  validatePassword(password: string): boolean {
    return this.password === password;
  }

  getInfoToToken() {
    return {
      name: this.name,
      email: this.email
    }
  }
}
