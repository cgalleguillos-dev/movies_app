import { join } from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ActorModule } from './modules/actor/actor.module';
import { DataSourceConfig } from './config/data.source';
import { UserModule } from './modules/user/user.module';
import { MovieModule } from './modules/movie/movie.module';
import { PlaylistModule } from './modules/playlist/playlist.module';
import { DatabaseModule } from './modules/database/database.module';
import { GenreModule } from './modules/genre/genre.module';
import { AuthModule } from './modules/auth/auth.module';
import baseConfig from './config/env/base-config';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.dev'],
      isGlobal: true,
      load: [baseConfig]
    }),
    TypeOrmModule.forRoot({
      ...DataSourceConfig
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    UserModule,
    ActorModule,
    MovieModule,
    PlaylistModule,
    DatabaseModule,
    GenreModule,
    AuthModule,
  ]
})
export class AppModule { }
