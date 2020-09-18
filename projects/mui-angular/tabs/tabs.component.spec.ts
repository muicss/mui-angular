import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TabComponent } from './tab.component';

import { TabsComponent } from './tabs.component';

@Component({
  selector: 'tabs-component-test',
  template: `
    <mui-tabs>
      <mui-tab tabId="1" label="Tab 1" [active]="true">Pane-1</mui-tab>
      <mui-tab tabId="2" label="Tab 2">Pane-2</mui-tab>
      <mui-tab tabId="3" label="Tab 3" >Pane-3</mui-tab>
    </mui-tabs>
  `
})
class TestTabsComponent{}

describe('TabsComponent', () => {
  let component: TabsComponent;
  let fixture: ComponentFixture<TestTabsComponent>;
  let ulEl: HTMLUListElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabsComponent, TabComponent, TestTabsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestTabsComponent);
    component = fixture.debugElement.children[0].componentInstance;
    ulEl = fixture.nativeElement.querySelector('ul');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('tab should have class mui-tabs__bar', () => {
    expect(ulEl).toHaveClass('mui-tabs__bar');
  });

  it('tabs should have class mui-tabs__bar--justified', () => {
    component.justified = true;
    fixture.detectChanges();
    expect(ulEl).toHaveClass('mui-tabs__bar--justified');
  });

  it('first tab should be active', () => {
    expect(component.tabs.first.active).toBe(true);
  });

  it('first tab should have label: Tab 1', () => {
    expect(component.tabs.first.label).toEqual('Tab 1');
  });

  it('clicking last tab should make it active', () => {
    component.tabs.last.onSelect();
    expect(component.tabs.last.active).toBe(true);
  });

  it('clicking last tab should emit index of 2', () => {
    const tab = component.tabs.last;
    const index = component.tabs.toArray().indexOf(tab);
    spyOn(component.muiChange, 'emit');
    component.onClick(tab);
    fixture.detectChanges();
    expect(component.muiChange.emit).toHaveBeenCalledWith(index);
  });
});
