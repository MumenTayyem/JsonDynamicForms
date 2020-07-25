import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextControlToAddComponent } from './text-control-to-add.component';

describe('TextControlToAddComponent', () => {
  let component: TextControlToAddComponent;
  let fixture: ComponentFixture<TextControlToAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextControlToAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextControlToAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
