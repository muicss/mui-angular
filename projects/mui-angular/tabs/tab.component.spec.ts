import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabComponent } from './tab.component';

describe('TabComponent', () => {
  let component: TabComponent;
  let fixture: ComponentFixture<TabComponent>;
  let tabEl = HTMLDivElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabComponent);
    component = fixture.componentInstance;
    tabEl = fixture.nativeElement.querySelector('div');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('tab should have class mui-tabs__pane', () => {
    expect(tabEl).toHaveClass('mui-tabs__pane');
  });

  it('tab should have class mui--is-active', () => {
    component.active = true;
    fixture.detectChanges();
    expect(tabEl).toHaveClass('mui--is-active');
  });
});
