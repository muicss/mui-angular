import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaretComponent } from './caret.component';

describe('CaretComponent', () => {
  let component: CaretComponent;
  let fixture: ComponentFixture<CaretComponent>;
  let spanEl: HTMLSpanElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CaretComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaretComponent);
    component = fixture.componentInstance;
    spanEl = fixture.nativeElement.querySelector('span');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('caret should have class mui-caret', () => {
    expect(spanEl).toHaveClass('mui-caret');
  });

  it('caret should have class mui-caret--left', () => {
    component.direction = 'left';
    component.ngAfterViewInit();
    fixture.detectChanges();
    expect(spanEl).toHaveClass('mui-caret--left');
  });

  it('caret should have class mui-caret--right', () => {
    component.direction = 'right';
    component.ngAfterViewInit();
    fixture.detectChanges();
    expect(spanEl).toHaveClass('mui-caret--right');
  });

  it('caret should have class mui-caret--up', () => {
    component.direction = 'up';
    component.ngAfterViewInit();
    fixture.detectChanges();
    expect(spanEl).toHaveClass('mui-caret--up');
  });

});
