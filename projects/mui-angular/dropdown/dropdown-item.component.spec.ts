import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ButtonModule } from 'mui-angular/button';
import { CaretModule } from 'mui-angular/caret';
import { ButtonComponent } from '../button/button.component';
import { CaretComponent } from '../caret/caret.component';
import { DropdownItemComponent } from './dropdown-item.component';
import { DropdownComponent } from './dropdown.component';


@Component({
  selector: 'dropdown-component-test',
  template: `
    <mui-dropdown label="dropup (right aligned)" color="primary" variant="flat" size="small" placement="up" alignment="right">
      <mui-dropdown-item link="appbar">Appbar</mui-dropdown-item>
      <mui-dropdown-item link="divider">Dividers</mui-dropdown-item>
    </mui-dropdown>
  `
})
class TestDropownComponent { }

describe('DropdownComponent', () => {
  let component: DropdownComponent;
  let fixture: ComponentFixture<TestDropownComponent>;
  let menuEl: HTMLUListElement;
  let wrapperEl: HTMLDivElement;
  let buttonEl: HTMLButtonElement;
  let caretEl: HTMLSpanElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ButtonModule, CaretModule],
      declarations: [DropdownComponent, DropdownItemComponent, TestDropownComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestDropownComponent);
    component = fixture.debugElement.children[0].componentInstance;
    wrapperEl = fixture.nativeElement.querySelector('div');
    menuEl = fixture.nativeElement.querySelector('ul');
    buttonEl = wrapperEl.querySelector('button');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('dropdown menu wrapper should have class mui-dropdown', () => {
    expect(wrapperEl).toHaveClass('mui-dropdown');
  });

  it('dropdown menu should have class mui-dropdown__menu', () => {
    expect(menuEl).toHaveClass('mui-dropdown__menu');
  });

  it('alignment right: menu should contain class mui-dropdown__menu--right', () => {
    expect(menuEl).toHaveClass('mui-dropdown__menu--right');
  });

  it('placement up: wrapper should contain class mui-dropdown--up', () => {
    caretEl = wrapperEl.querySelector('.mui-caret');
    expect(wrapperEl).toHaveClass('mui-dropdown--up');
  });

  it('placement up: caret contain class mui-caret--up', () => {
    caretEl = wrapperEl.querySelector('.mui-caret');
    expect(caretEl).toHaveClass('mui-caret--up');
  });

  it('first dropdown-item should have link appbar', () => {
    fixture.detectChanges();
    expect(component.items.first.link).toEqual('appbar');
  });

  it('last dropdown-item should have link divider', () => {
    fixture.detectChanges();
    expect(component.items.last.link).toEqual('divider');
  });

  it('button should have size small', () => {
    expect(buttonEl).toHaveClass('mui-btn--small');
  });

  it('button should have variant flat', () => {
    expect(buttonEl).toHaveClass('mui-btn--flat');
  });

  it('button should have color primary', () => {
    expect(buttonEl).toHaveClass('mui-btn--primary');
  });

  it('clicking button onClick should have been called 1 time', () => {
    spyOn(component, 'onClick');
    const mouseClick = new MouseEvent('clicked');
    component.onClick(mouseClick);
    fixture.detectChanges();
    expect(component.onClick).toHaveBeenCalledTimes(1);
  });

  it('closeDropdown() should not contain class mui--is-open', () => {
    component.closeDropdown();
    fixture.detectChanges();
    expect(menuEl).not.toHaveClass('mui--is-open');
  });

  it('openDropdown() should contain class mui--is-open', () => {
    component.openDropdown();
    fixture.detectChanges();
    expect(menuEl).toHaveClass('mui--is-open');
  });
});
