import { Component } from '@angular/core';
import { FormControl, NgControl, FormsModule, NgForm } from '@angular/forms';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { InputComponent } from 'mui-angular/input';

@Component({
  selector: 'input-template-component-test',
  template: `
    <form class="mui-form" #f="ngForm" (submit)="onSubmit(f)">
      <mui-input label="First Name" [(ngModel)]="first" name="first" hint="enter first name here" required="true"></mui-input>
      <mui-input label="Last Name" [(ngModel)]="last" name="last" hint="enter last name here" required="true"></mui-input>
      <mui-input type="number" label="Zip code" [(ngModel)]="zip" name="zip" hint="enter zip code here"></mui-input>
    </form>
  `
})
class TestInputComponent {
  first: any = '';
  last: any = '';
  zip: number = 68845;
}

describe('InputComponent-Template Driven', () => {
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
      }
    };

    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [InputComponent, TestInputComponent],
    })
      .overrideComponent(InputComponent, {
        add: { providers: [NG_CONTROL_PROVIDER] },
      })
      .compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TestInputComponent);
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
