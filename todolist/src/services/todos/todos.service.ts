import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Todo } from '../../entities/todo.entity';
import { CategoryService } from '../category/category.service';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
    protected categoryService: CategoryService,
  ) {}

  async findAll(): Promise<Todo[]> {
    return await this.todoRepository
      .createQueryBuilder('todo')
      .leftJoinAndSelect('todo.category', 'category')
      .getMany();
  }

  async findByCategory(categoryId: number): Promise<Todo[]> {
    return this.todoRepository
      .createQueryBuilder('todo')
      .leftJoinAndSelect('todo.category', 'category')
      .where('todo.categoryId = :categoryId', {categoryId})
      .getMany();
  }

  async findById(id: number): Promise<Todo> {
    return this.todoRepository
      .createQueryBuilder('todo')
      .leftJoinAndSelect('todo.category', 'category')
      .where('todo.id = :id', { id })
      .getOne();
  }

  async create(text: string, categoryName: string): Promise<Todo> {
    const category = await this.categoryService.ensureCategory(categoryName);
    const todo = this.todoRepository.create({ text });
    todo.category = category;
    this.todoRepository.save(todo);
    return todo;
  }

  async setStatus(id: number, isCompleted: boolean) {
    const todo = await this.findById(id);
    todo.isCompleted = isCompleted;
    this.todoRepository.save(todo);
    return todo;
  }
}
