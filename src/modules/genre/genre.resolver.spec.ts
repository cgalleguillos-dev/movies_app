import { Test, TestingModule } from '@nestjs/testing';
import { GenreResolver } from './genre.resolver';
import { GenreService } from './genre.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genre } from '../../entities';
import { DataSourceConfig } from '../../config/data.source';

describe('GenreResolver', () => {
  let resolver: GenreResolver;
  let service: GenreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({ ...DataSourceConfig }),
        TypeOrmModule.forFeature([Genre])],
      providers: [GenreResolver, GenreService],
    }).compile();

    resolver = module.get<GenreResolver>(GenreResolver);
    service = module.get<GenreService>(GenreService);
  });

  describe('findAll', () => {
    it('should return an array of genres', async () => {
      const genres = [{ id: 1, name: 'Action' }, { id: 2, name: 'Comedy' }];
      jest.spyOn(service, 'findAll').mockResolvedValue(genres);
      const result = await resolver.findAll();
      console.log('result', result);
      expect(result).toEqual(genres);
    });
  });

});
