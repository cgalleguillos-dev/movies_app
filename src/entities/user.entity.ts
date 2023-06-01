import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Playlist } from './playlist.entity';
import * as bcrypt from 'bcrypt';

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

  encryptPassword(password: string) {
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(password, salt);
  }

  validatePassword(password: string): boolean {
    return bcrypt.compareSync(password, this.password);
  }

  getInfoToToken() {
    return {
      name: this.name,
      email: this.email
    }
  }
}
