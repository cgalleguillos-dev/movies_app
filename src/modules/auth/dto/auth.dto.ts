import { ObjectType, Field, InputType } from "@nestjs/graphql";
import { User } from "src/entities";

@InputType()
export class LoginInput {
    @Field()
    email: string;

    @Field()
    password: string;
}


@ObjectType()
export class LoginResponse {

    @Field(() => String)
    token: string;

    @Field(() => User)
    user: User;
}