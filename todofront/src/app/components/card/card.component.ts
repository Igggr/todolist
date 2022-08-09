import { Component, Input, OnInit } from '@angular/core';
import { TodoSyncService } from '../../services/todo-sync.service'
import { Category, Todo } from '../../dto';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input('category') category!: Category;

  constructor(private readonly todoService: TodoSyncService) { }

  ngOnInit(): void {
  }

  setTodoStatus(todo: Todo, status: boolean) {
    this.todoService.mutateStatus(todo, status);
  }

}
