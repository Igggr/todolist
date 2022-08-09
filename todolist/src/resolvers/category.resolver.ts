import {
  Args,
  Mutation,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { CategoryService } from '../services/category/category.service';
import { Category } from '../entities/category.entity';

@Resolver(() => [Category])
export class CategoryResolver {
  constructor(
    private categoryService: CategoryService,
  ) {}

  @Query(() => [Category])
  async categories(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Query(() => Category)
  async category(@Args('id') id: number) {
    return await this.categoryService.findById(id);
  }


  @Mutation(() => Category)
  async addCategory(@Args('title') title: string): Promise<Category> {
    return await this.categoryService.ensureCategory(title);
  }
}
