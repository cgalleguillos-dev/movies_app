import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Movie {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  title: string;

  @Column()
  @Field()
  description: string;

  @Column()
  @Field()
  image: string;

  @Column()
  @Field()
  year: number;

  @Column()
  @Field()
  duration: number;

  @Column()
  @Field()
  rating: number;

  @Column()
  @Field()
  actors: string;
}
