import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Actor } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class ActorService {
  constructor(
    @InjectRepository(Actor) private actorRepository: Repository<Actor>
  ) { }
  async findAll() {
    return await this.actorRepository.find();
  }

  async findOne(id: number) {
    return await this.actorRepository.findOne({
      where: { id }
    })
  }
}
