import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule} from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

import { AppComponent } from './app.component';
import { CardComponent } from './components/card/card.component';
import { TodoSyncService } from './services/todo-sync.service';
import { DataSynchronizerComponent } from './components/data-synchronizer/data-synchronizer.component';
import { GraphQLModule } from './graphql.module';
import { TodoDialogComponent } from './components/todo-dialog/todo-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    DataSynchronizerComponent,
    TodoDialogComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    GraphQLModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    MatCardModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
  ],
  providers: [
    TodoSyncService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
