import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlBasicInfoComponent } from './control-basic-info.component';

describe('ControlBasicInfoComponent', () => {
  let component: ControlBasicInfoComponent;
  let fixture: ComponentFixture<ControlBasicInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlBasicInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlBasicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
