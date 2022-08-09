import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { Category } from './category.entity';

@ObjectType('Todo')
@Entity('todo')
export class Todo {
  @Field((type) => Int) // указать тип точнее
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  text: string;

  @Field()
  @Column({ default: false })
  isCompleted: boolean;

  @Field((type) => Category)
  @ManyToOne((type) => Category, (category) => category.todos)
  @JoinColumn({ name:'categoryId', referencedColumnName: 'id' })
  category!: Category;
}
