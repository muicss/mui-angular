import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, NgControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InputComponent } from 'mui-angular/input';
import { ButtonModule } from 'mui-angular/button';

@Component({
  selector: 'input-component-test',
  template: `
    <form class="mui-form" [formGroup]="basicForm" (ngSubmit)="onSubmitReactive()">
      <mui-input id="first" muiFloatingLabel label="First Name" formControlName="first" minlength="3" maxlength="10" autofocus="true"></mui-input>
      <mui-input label="Last Name" formControlName="last" hint="enter last name"></mui-input>
      <mui-input type="email" label="Email" formControlName="email" hint="enter email"></mui-input>
      <mui-input type="number" label="Zip Code" formControlName="zip" hint="enter zip code"></mui-input>
      <mui-input type="password" label="Password" formControlName="pwd" hint="enter password"></mui-input>
      <mui-button [disabled]="!basicForm.valid"  variant="raised" size="small" color="primary">Submit</mui-button>
    </form>
  `
})
class TestInputComponent {

  basicForm = new FormGroup({
    first: new FormControl('MUI', Validators.required),
    last: new FormControl('', Validators.required),
    zip: new FormControl(''),
    email: new FormControl('', [Validators.email]),
    pwd: new FormControl('')
  });
}

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<TestInputComponent>;
  let wrapperEl: HTMLDivElement;
  let inputs: HTMLInputElement[];

  beforeEach(async(() => {
    const NG_CONTROL_PROVIDER = {
      provide: NgControl,
      useClass: class extends NgControl {
        control = new FormControl();
        viewToModelUpdate(): void { }
      }};

    TestBed.configureTestingModule({
        imports: [ReactiveFormsModule, FormsModule, ButtonModule],
        declarations: [InputComponent, TestInputComponent],

      })
        .overrideComponent(InputComponent, {
          add: { providers: [NG_CONTROL_PROVIDER] },
        })
        .compileComponents();
    }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestInputComponent);
    component = fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();
    inputs = fixture.nativeElement.querySelectorAll('input');
    wrapperEl = fixture.nativeElement.querySelector('div');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('wrapper div should have class mui-textfield', () => {
    expect(wrapperEl).toHaveClass('mui-textfield');
  });

  it('form should have 5 input fields (text, text, email, number, password', () => {
    expect(inputs.length).toBe(5);
    expect(inputs[0].type).toEqual('text');
    expect(inputs[0]).toHaveClass('mui--is-not-empty');
    expect(inputs[0]).toHaveClass('mui--is-pristine');
    expect(inputs[0]).toHaveClass('mui--is-untouched');
    expect(inputs[1].type).toEqual('text');
    expect(inputs[1]).toHaveClass('mui--is-empty');
    expect(inputs[1]).toHaveClass('mui--is-invalid');
    expect(inputs[2].type).toEqual('email');
    expect(inputs[3].type).toEqual('number');
    expect(inputs[4].type).toEqual('password');
  });

  it('first name should default to MUI', () => {
    expect(inputs[0].value).toEqual('MUI');
  });

  it('form should be invalid', () => {
    const form = fixture.componentInstance.basicForm;
    expect(form.valid).toBeFalsy();
  });

  it('form should be valid after setting last name to CSS', () => {
    const form = fixture.componentInstance.basicForm;
    inputs[1].value = 'CSS';
    inputs[1].dispatchEvent(new Event('input'));
    inputs[1].dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    expect(form.valid).toBeTruthy();
    expect(form.controls.last.value).toEqual('CSS');
    expect(inputs[1]).toHaveClass('mui--is-dirty');
    expect(inputs[1]).toHaveClass('mui--is-not-empty');
    expect(inputs[1]).toHaveClass('mui--is-touched');
  });

});
