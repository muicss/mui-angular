import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;
  let button: HTMLButtonElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    button = fixture.nativeElement.querySelector('button');
    component.variant = 'raised';
    component.color = 'primary';
    component.size = 'large';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('button should have class mui-btn', () => {
    expect(button).toHaveClass('mui-btn');
  });

  it('button should be variant raised', () => {
    expect(button).toHaveClass('mui-btn--raised');
  });

  it('button should be color primary', () => {
    expect(button).toHaveClass('mui-btn--primary');
  });

  it('button should be size large', () => {
    expect(button).toHaveClass('mui-btn--large');
  });

});
