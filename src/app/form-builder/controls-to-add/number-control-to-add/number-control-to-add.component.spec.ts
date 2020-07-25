import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberControlToAddComponent } from './number-control-to-add.component';

describe('NumberControlToAddComponent', () => {
  let component: NumberControlToAddComponent;
  let fixture: ComponentFixture<NumberControlToAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumberControlToAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberControlToAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
