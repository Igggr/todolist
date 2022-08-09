import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../../entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  findAll(): Promise<Category[]> {
    return this.categoryRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.todos', 'todo')
      .getMany();
  }

  findById(id: number): Promise<Category> {
    return this.categoryRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.todos', 'todo')
      .where('category.id = :id', { id } )
      .getOne();
  }

  async ensureCategory(title: string): Promise<Category> {
    const category = await this.categoryRepository.findOneBy({ title });
    if (category) return category;

    const newCategory = this.categoryRepository.create({ title });
    this.categoryRepository.save(newCategory);
    return newCategory;
  }
}
