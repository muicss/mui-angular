import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerComponent } from './container.component';

describe('ContainerComponent', () => {
  let component: ContainerComponent;
  let fixture: ComponentFixture<ContainerComponent>;
  let containerEl: HTMLDivElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContainerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerComponent);
    component = fixture.componentInstance;
    containerEl = fixture.nativeElement.querySelector('div');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('container should have class mui-container', () => {
    expect(containerEl).toHaveClass('mui-container');
  });

  it('container should have class mui-container-fluid', () => {
    component.fluid = '';
    component.ngAfterViewInit();
    fixture.detectChanges();
    expect(containerEl).toHaveClass('mui-container-fluid');
  });
});
