import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { Todo } from './entities/todo.entity';
import { Category } from './entities/category.entity';
import { CategoryService } from './services/category/category.service';
import { TodosService } from './services/todos/todos.service';
import { CategoryResolver } from './resolvers/category.resolver';
import { TodoResolver } from './resolvers/todo.resolver';
import { Repository } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: '123456',
      database: 'todos',
      entities: [Todo, Category],
      synchronize: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
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
