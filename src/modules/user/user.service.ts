import { Inject, Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Repository } from 'typeorm';
import { User } from 'src/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileUserDto } from './dto/profile-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User)
  private userRepository: Repository<User>
  ) { }

  create(createUserInput: CreateUserInput) {
    return 'This action adds a new user';
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: string): Promise<ProfileUserDto> {
    const user = await this.userRepository.findOne(
      {
        where: { id: id }
      }
    );

    return {
      name: user.name,
      email: user.email,
      password: user.password,
    }
  }

  update(id: string, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
