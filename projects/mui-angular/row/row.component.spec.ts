import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RowComponent } from './row.component';

describe('RowComponent', () => {
  let component: RowComponent;
  let fixture: ComponentFixture<RowComponent>;
  let rowEl = HTMLDivElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RowComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RowComponent);
    component = fixture.componentInstance;
    rowEl = fixture.nativeElement.querySelector('div');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('row should have class mui-row', () => {
    expect(rowEl).toHaveClass('mui-row');
  });
});
