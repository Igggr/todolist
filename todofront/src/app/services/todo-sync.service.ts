import { Injectable } from '@angular/core';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { EmptyObject } from 'apollo-angular/types';
import { Todo } from '../dto';



@Injectable({
  providedIn: 'root'
})
export class TodoSyncService {

  constructor(
    private apollo: Apollo,
  ) { }

  loadCategories(): QueryRef<any, EmptyObject> {
    return this.apollo
      .watchQuery<any>({
        query: gql`
        query {
          categories {
             id
             title
             todos {
                id
                text
                isCompleted
             }
          }
       }
        `,
      })
  }

  mutateStatus(todo: Todo, status: boolean) {
     console.log(`Todo '${todo.text}' set to ${status}`);

     const SET_TODO_STATE = gql`
        mutation {
          setStatus(id: ${todo.id}, is_completed: ${status}) {
            id
            isCompleted
            category {
              title
            }
          }
        }
    `;
     this.apollo.mutate({mutation: SET_TODO_STATE}).subscribe((r) => console.log(r));
  }

  uploadTodo(todo_text: string, category_name: string) {
    console.log(`Adding Todo ${todo_text} with category ${category_name}`);
    
    const UPLOAD_TODO = gql`
    mutation {
      createTodo(input: { text: "${todo_text}", categoryName: "${category_name}" }) {
        text
        category {
          title
        }
      }
    }`

    return this.apollo.mutate({mutation: UPLOAD_TODO});
  }
}
