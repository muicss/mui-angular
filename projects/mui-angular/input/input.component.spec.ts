import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule, NgForm } from '@angular/forms';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { InputComponent } from '@muicss/angular/input';

@Component({
  template: `
    <form class="mui-form" [formGroup]="basicForm" (ngSubmit)="onSubmitReactive()">
      <mui-input id="first" muiFloatingLabel label="First Name" formControlName="first" minlength="3" maxlength="10" autofocus="true"></mui-input>
      <mui-input label="Last Name" formControlName="last" hint="enter last name"></mui-input>
      <mui-input type="email" label="Email" formControlName="email" hint="enter email"></mui-input>
      <mui-input type="number" label="Zip Code" formControlName="zip" hint="enter zip code"></mui-input>
      <mui-input type="password" label="Password" formControlName="pwd" hint="enter password"></mui-input>
    </form>
  `
})
class TestReactiveInputComponent {

  basicForm = new FormGroup({
    first: new FormControl('MUI', Validators.required),
    last: new FormControl('', Validators.required),
    zip: new FormControl(''),
    email: new FormControl('', [Validators.email]),
    pwd: new FormControl('')
  });
}

@Component({
  template: `
    <form class="mui-form" #f="ngForm" (submit)="onSubmit(f)">
      <mui-input label="First Name" [(ngModel)]="first" name="first" hint="enter first name here" required="true"></mui-input>
      <mui-input label="Last Name" [(ngModel)]="last" name="last" hint="enter last name here" required="true"></mui-input>
      <mui-input type="number" label="Zip code" [(ngModel)]="zip" name="zip" hint="enter zip code here"></mui-input>
    </form>
  `
})
class TestTemplateDrivenInputComponent {
  first: any = '';
  last: any = '';
  zip: number = 68845;
}

describe('InputComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [InputComponent, TestReactiveInputComponent, TestTemplateDrivenInputComponent],
    });

    TestBed.compileComponents();
  }));

  describe('Reactive Input in form', () => {
    let component: InputComponent;
    let fixture: ComponentFixture<TestReactiveInputComponent>;
    let wrapperEl: HTMLDivElement;
    let inputs: HTMLInputElement[];

    beforeEach(() => {
      fixture = TestBed.createComponent(TestReactiveInputComponent);
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

  describe('InputComponent-Template Driven', () => {
    let component: InputComponent;
    let fixture: ComponentFixture<TestTemplateDrivenInputComponent>;
    let wrapperEl: HTMLDivElement;
    let inputs: HTMLInputElement[];

    beforeEach(async(() => {
      fixture = TestBed.createComponent(TestTemplateDrivenInputComponent);
      component = fixture.debugElement.children[0].componentInstance;
      inputs = fixture.nativeElement.querySelectorAll('input');
      wrapperEl = fixture.nativeElement.querySelector('div');
      fixture.autoDetectChanges();
    }));

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('wrapper div should have class mui-textfield', () => {
      expect(wrapperEl).toHaveClass('mui-textfield');
    });

    it('template form should have 3 input fields (text, text, number)', () => {
      expect(inputs.length).toBe(3);
      expect(inputs[0].type).toEqual('text');
      expect(inputs[0]).toHaveClass('mui--is-empty');
      expect(inputs[0]).toHaveClass('mui--is-pristine');
      expect(inputs[0]).toHaveClass('mui--is-untouched');
      expect(inputs[0]).toHaveClass('mui--is-invalid');

      expect(inputs[1].type).toEqual('text');
      expect(inputs[1]).toHaveClass('mui--is-empty');
      expect(inputs[1]).toHaveClass('mui--is-pristine');
      expect(inputs[1]).toHaveClass('mui--is-untouched');

      expect(inputs[2].type).toEqual('number');
      expect(inputs[2]).toHaveClass('mui--is-not-empty');
      expect(inputs[2]).toHaveClass('mui--is-untouched');

      const form = fixture.debugElement.children[0].injector.get(NgForm);
      expect(form.value).toEqual({ first: '', last: '', zip: 68845 });
      expect(form.valid).toBe(false);
    });

    it('should update last to be CSS in the component', () => {
      inputs[1].value = 'CSS';
      inputs[1].dispatchEvent(new Event('input'));
      inputs[1].dispatchEvent(new Event('blur'));

      expect(fixture.componentInstance.last).toEqual('CSS');

      expect(inputs[1]).toHaveClass('mui--is-dirty');
      expect(inputs[1]).toHaveClass('mui--is-not-empty');
      expect(inputs[1]).toHaveClass('mui--is-touched');
      expect(inputs[1]).not.toHaveClass('mui--is-invalid');
    });

    it('should update first name to MUI on the input field', fakeAsync(() => {
      fixture.componentInstance.first = 'MUI';
      inputs[0].dispatchEvent(new Event('blur'));
      fixture.autoDetectChanges();
      tick();

      expect(inputs[0].value).toEqual('MUI');
      expect(inputs[0]).toHaveClass('mui--is-not-empty');
      expect(inputs[0]).not.toHaveClass('mui--is-invalid');
    }));

    it('should support ngModel registration with a parent form', fakeAsync(() => {
      const form = fixture.debugElement.children[0].injector.get(NgForm).form;
      fixture.componentInstance.first = 'MUI';
      fixture.detectChanges();
      tick();

      expect(form.value).toEqual({ first: 'MUI', last: '', zip: 68845 });
      expect(form.valid).toBe(false);
    }));
  });
});
