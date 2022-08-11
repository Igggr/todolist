import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { TodoSyncService } from '../../services/todo-sync.service';
import { Category } from '../../dto';
import { TodoDialogComponent } from '../todo-dialog/todo-dialog.component';

@Component({
  selector: 'app-data-synchronizer',
  templateUrl: './data-synchronizer.component.html',
  styleUrls: ['./data-synchronizer.component.scss']
})
export class DataSynchronizerComponent implements OnInit {

  categories!: Category[];
  private querySubscription!: Subscription;

  constructor(
    private readonly todoService: TodoSyncService,
    public dialog: MatDialog,
    ) {}

  ngOnInit(): void {
    this.querySubscription = this.todoService.loadCategories()
      .valueChanges
      .subscribe(({ data, }) => {
        this.categories = data.categories;
      }
    );
  }

  refetch(self: typeof this): void {
    console.log('refetching....')
    self.todoService.loadCategories().refetch().then(res => {
      console.log(res.data.categories)
      self.categories = res.data.categories;
      console.log('finish refetch')
    })
  }


  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }

  openDialog(): void {
    this.dialog.open(
      TodoDialogComponent,
      {
        width: '500px',
        data: { categories: this.categories, ref: this }
      }
    );
  }

}
