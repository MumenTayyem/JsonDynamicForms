import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateControlToAddComponent } from './date-control-to-add.component';

describe('DateControlToAddComponent', () => {
  let component: DateControlToAddComponent;
  let fixture: ComponentFixture<DateControlToAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateControlToAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateControlToAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
