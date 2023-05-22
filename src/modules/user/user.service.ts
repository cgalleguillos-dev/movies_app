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

  async update(id: string, updateUserInput: UpdateUserInput) {
    const user = await this.userRepository.findOne({
      where: { id: id }
    });
    if (!user) {
      throw new Error(`User not found`);
    }
    user.name = updateUserInput.name;
    user.email = updateUserInput.email;
    user.password = updateUserInput.password;
    return await this.userRepository.save(user);
  }
}
