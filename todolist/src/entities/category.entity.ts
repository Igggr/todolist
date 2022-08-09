import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { Todo } from './todo.entity';

@ObjectType('Category')
@Entity('category')
export class Category {
  @Field((type) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field((type) => [Todo], { nullable: true })
  @OneToMany((type) => Todo, (todo) => todo.category, { onDelete: 'RESTRICT' })
  public todos: Todo[];
}
