import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlToAddComponent } from './control-to-add.component';

describe('ControlToAddComponent', () => {
  let component: ControlToAddComponent;
  let fixture: ComponentFixture<ControlToAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlToAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlToAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
