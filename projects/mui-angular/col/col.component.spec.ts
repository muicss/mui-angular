import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ColComponent } from './col.component';

describe('ColComponent', () => {
  let component: ColComponent;
  let fixture: ComponentFixture<ColComponent>;
  let col: HTMLDivElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ColComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColComponent);
    component = fixture.componentInstance;
    col = fixture.nativeElement.querySelector('div');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('lg col should have class mui-col-lg-4', () => {
    component.lg = 4;
    component.ngAfterViewInit();
    fixture.detectChanges();
    expect(col).toHaveClass('mui-col-lg-4');
  });

  it('md col should have class mui-col-md-6', () => {
    component.md = 6;
    component.ngAfterViewInit();
    fixture.detectChanges();
    expect(col).toHaveClass('mui-col-md-6');
  });

  it('sm col should have class mui-col-sm-8', () => {
    component.sm = 8;
    component.ngAfterViewInit();
    fixture.detectChanges();
    expect(col).toHaveClass('mui-col-sm-8');
  });

  it('xl col should have class mui-col-xl-2', () => {
    component.xl = 2;
    component.ngAfterViewInit();
    fixture.detectChanges();
    expect(col).toHaveClass('mui-col-xl-2');
  });

  it('xs col should have class mui-col-xs-12', () => {
    component.xs = 12;
    component.ngAfterViewInit();
    fixture.detectChanges();
    expect(col).toHaveClass('mui-col-xs-12');
  });

  it('lg-offset col should have class mui-col-lg-offset-1', () => {
    component['lg-offset'] = 1;
    component.ngAfterViewInit();
    fixture.detectChanges();
    expect(col).toHaveClass('mui-col-lg-offset-1');
  });

  it('md-offset col should have class mui-col-md-offset-2', () => {
    component['md-offset'] = 2;
    component.ngAfterViewInit();
    fixture.detectChanges();
    expect(col).toHaveClass('mui-col-md-offset-2');
  });

  it('sm-offset col should have class mui-col-sm-offset-3', () => {
    component['sm-offset'] = 3;
    component.ngAfterViewInit();
    fixture.detectChanges();
    expect(col).toHaveClass('mui-col-sm-offset-3');
  });

  it('xl-offset col should have class mui-col-xl-offset-4', () => {
    component['xl-offset'] = 4;
    component.ngAfterViewInit();
    fixture.detectChanges();
    expect(col).toHaveClass('mui-col-xl-offset-4');
  });

  it('xs-offset col should have class mui-col-xs-offset-5', () => {
    component['xs-offset'] = 5;
    component.ngAfterViewInit();
    fixture.detectChanges();
    expect(col).toHaveClass('mui-col-xs-offset-5');
  });
});
