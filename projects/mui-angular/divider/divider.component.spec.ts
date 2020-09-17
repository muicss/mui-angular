import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DividerComponent } from './divider.component';

describe('DividerComponent', () => {
  let component: DividerComponent;
  let fixture: ComponentFixture<DividerComponent>;
  let dividerEl: HTMLDivElement;
  let spanEl: HTMLSpanElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DividerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DividerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('divider should have class mui-divider', () => {
    component.ngAfterViewInit();
    dividerEl = fixture.nativeElement.querySelector('div');
    fixture.detectChanges();
    expect(dividerEl).toHaveClass('mui-divider');
  });

  it('divider should have class mui--divider-top', () => {
    component.location = 'top';
    fixture.detectChanges();
    component.ngAfterViewInit();
    dividerEl = fixture.nativeElement.querySelector('div');
    expect(dividerEl).toHaveClass('mui--divider-top');
  });

  it('divider should have class mui--divider-bottom', () => {
    component.location = 'bottom';
    fixture.detectChanges();
    component.ngAfterViewInit();
    dividerEl = fixture.nativeElement.querySelector('div');
    expect(dividerEl).toHaveClass('mui--divider-bottom');
  });

  it('divider should have class mui--divider-right', () => {
    component.location = 'right';
    component.ngOnInit();
    fixture.detectChanges();
    component.ngAfterViewInit();
    spanEl = fixture.nativeElement.querySelector('span');
    expect(spanEl).toHaveClass('mui--divider-right');
  });

  it('divider should have class mui--divider-left', () => {
    component.location = 'left';
    component.ngOnInit();
    fixture.detectChanges();
    component.ngAfterViewInit();
    spanEl = fixture.nativeElement.querySelector('span');
    expect(spanEl).toHaveClass('mui--divider-left');
  });
});
