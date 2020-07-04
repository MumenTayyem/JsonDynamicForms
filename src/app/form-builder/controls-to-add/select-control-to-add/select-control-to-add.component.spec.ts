import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectControlToAddComponent } from './select-control-to-add.component';

describe('SelectControlToAddComponent', () => {
  let component: SelectControlToAddComponent;
  let fixture: ComponentFixture<SelectControlToAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectControlToAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectControlToAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
