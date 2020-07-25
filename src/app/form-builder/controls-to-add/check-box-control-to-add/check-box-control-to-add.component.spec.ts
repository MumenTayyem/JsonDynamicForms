import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckBoxControlToAddComponent } from './check-box-control-to-add.component';

describe('CheckBoxControlToAddComponent', () => {
  let component: CheckBoxControlToAddComponent;
  let fixture: ComponentFixture<CheckBoxControlToAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckBoxControlToAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckBoxControlToAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
