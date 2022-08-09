import {
  Args,
  Int,
  Mutation,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { TodosService } from '../services/todos/todos.service';
import { Todo } from '../entities/todo.entity';
import { CreateTodoInput } from '../dto/create-todo-input';

@Resolver(() => [Todo])
export class TodoResolver {
  constructor(
    private todoService: TodosService,
  ) {}

  @Query(() => [Todo])
  async todos(): Promise<Todo[]> {
    return await this.todoService.findAll();
  }

  @Query(() => [Todo])
  async todosInCategory(
    @Args('category_id') category_id: number,
  ): Promise<Todo[]> {
    return await this.todoService.findByCategory(category_id);
  }

  @Query(() => Todo)
  async todo(@Args({ name: 'id', type: () => Int }) id: number) {
    return await this.todoService.findById(id);
  }

  @Mutation(() => Todo)
  async setStatus(
    @Args({ name: 'id', type: () => Int }) id: number,
    @Args('is_completed') isCompleted: boolean,
  ) {
    return await this.todoService.setStatus(id, isCompleted);
  }

  @Mutation(() => Todo)
  async createTodo(@Args('input') input: CreateTodoInput): Promise<Todo> {
    return await this.todoService.create(input.text, input.categoryName);
  }
}
