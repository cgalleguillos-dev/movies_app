import { ObjectType, Field } from "@nestjs/graphql";
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import { Movie } from "./movie.entity";

@Entity()
@ObjectType()
export class Genre {
    @Field()
    @Column(
        {
            primary: true
        }
    )
    id: number;

    @Field()
    @Column()
    name: string;
}