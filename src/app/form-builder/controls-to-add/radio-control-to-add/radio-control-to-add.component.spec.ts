import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioControlToAddComponent } from './radio-control-to-add.component';

describe('RadioControlToAddComponent', () => {
  let component: RadioControlToAddComponent;
  let fixture: ComponentFixture<RadioControlToAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadioControlToAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioControlToAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
