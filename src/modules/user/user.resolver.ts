import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from '../../entities';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ProfileUserDto } from './dto/profile-user.dto';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) { }

  @UseGuards(JwtAuthGuard)
  @Query(() => [User], { name: 'users' })
  async findAll() {
    return await this.userService.findAll();
  }

  @Query(() => User, { name: 'usersById' })
  async findOne(@Args('id') id: string) {
    return await this.userService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => User)
  async updateUser(@Context() context, @Args('updateUserInput') updateUserInput: UpdateUserInput) {
    const userId = context.req.user.id;
    return await this.userService.update(userId, updateUserInput);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => User, { name: 'profile' })
  async profile(@Context() context): Promise<ProfileUserDto> {
    const userId = context.req.user.id;
    return await this.userService.findOne(userId);
  }

}
