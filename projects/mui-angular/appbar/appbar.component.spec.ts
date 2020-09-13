import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppbarComponent } from './appbar.component';

describe('AppbarComponent', () => {
  let component: AppbarComponent;
  let fixture: ComponentFixture<AppbarComponent>;
  let appbarEl = HTMLDivElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppbarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppbarComponent);
    component = fixture.componentInstance;
    appbarEl = fixture.nativeElement.querySelector('div');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('appbar should have class mui-appbar', () => {
    expect(appbarEl).toHaveClass('mui-appbar');
  });
});
