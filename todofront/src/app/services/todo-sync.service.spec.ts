import { TestBed } from '@angular/core/testing';

import { TodoSyncService } from './todo-sync.service';

describe('TodoSyncService', () => {
  let service: TodoSyncService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoSyncService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
