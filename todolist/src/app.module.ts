import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { join } from 'path';

import { Todo } from './entities/todo.entity';
import { Category } from './entities/category.entity';
import { CategoryService } from './services/category/category.service';
import { TodosService } from './services/todos/todos.service';
import { CategoryResolver } from './resolvers/category.resolver';
import { TodoResolver } from './resolvers/todo.resolver';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'front'),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: process.env.DATABASE_URL || configService .get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        entities: [Todo, Category],
        synchronize: true,
      })
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      useGlobalPrefix: true
    }),
    TypeOrmModule.forFeature([Todo, Category]),
  ],
  controllers: [],
  providers: [
    CategoryService,
    TodosService,
    CategoryResolver,
    TodoResolver,
    Repository<Category>,
    Repository<Todo>,
  ],
})
export class AppModule {}
