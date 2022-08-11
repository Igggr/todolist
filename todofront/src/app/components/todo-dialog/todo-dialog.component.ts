import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { Category } from 'src/app/dto';
import { TodoSyncService } from 'src/app/services/todo-sync.service';

@Component({
  selector: 'app-todo-dialog',
  templateUrl: './todo-dialog.component.html',
  styleUrls: ['./todo-dialog.component.scss']
})
export class TodoDialogComponent {

  addNewCategoryText = 'Add a new category to your todo';
  displayAddCategoryField: boolean = false;
  subscription?: Subscription;

  taskForm = this.formBuilder.group({
    category_name: '',
    task_text: '',
  })

  constructor(
    public dialogRef: MatDialogRef<TodoDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { categories: Category[], ref: any },
    private readonly todoService: TodoSyncService,
  ) {}

  ngOnInit() {
    this.taskForm.valueChanges.subscribe(data => {
      const categoriesToChoose = this.data.categories.map((category) => category.title);
      console.log(categoriesToChoose);
      console.log(data);

      if (data.category_name === this.addNewCategoryText) {
        this.displayAddCategoryField = true;
        this.taskForm.patchValue({ category_name: ''});
      } else if (categoriesToChoose.includes(data.category_name)) {
        this.displayAddCategoryField = false;
      }
    })
  }

  ngOnDestroy() {
    console.log('unsubscribing..');
    this.subscription?.unsubscribe();
  }

  onSubmit() {
    console.log('submit form')
    const { category_name, task_text } = this.taskForm.value;
    if (!category_name) {
      alert('Укажите категорию')
    } else if (!task_text) {
      alert('Заполните описание задачи')
    } else {
      this.subscription =  this.todoService.uploadTodo(task_text, category_name)
      .subscribe((response) => {
          console.log(response)
          setTimeout(() => { this.data.ref.refetch(this.data.ref); }, 2000)
          this.dialogRef.close();
        });
      

    }

  }
}