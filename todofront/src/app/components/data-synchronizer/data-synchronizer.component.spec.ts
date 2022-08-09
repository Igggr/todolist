import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSynchronizerComponent } from './data-synchronizer.component';

describe('DataSynchronizerComponent', () => {
  let component: DataSynchronizerComponent;
  let fixture: ComponentFixture<DataSynchronizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataSynchronizerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataSynchronizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
