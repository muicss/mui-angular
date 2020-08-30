import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MuiAngularComponent } from './mui-angular.component';

describe('MuiAngularComponent', () => {
  let component: MuiAngularComponent;
  let fixture: ComponentFixture<MuiAngularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MuiAngularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MuiAngularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
