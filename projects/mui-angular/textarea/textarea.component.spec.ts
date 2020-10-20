import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, NgControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TextareaComponent } from 'mui-angular/textarea';
import { ButtonModule } from 'mui-angular/button';

@Component({
  selector: 'textarea-component-test',
  template: `
    <mui-form [formGroup]="basicForm" (ngSubmit)="onSubmitReactive()">
    <mui-textarea label="Notes" formControlName="notes" hint="textarea"></mui-textarea>
    <mui-textarea label="Description" formControlName="description" hint="textarea" rows="5"></mui-textarea>
    </mui-form>
  `
})
class TestTextareaComponent {
  basicForm = new FormGroup({
    notes: new FormControl('This is default text', Validators.required),
    description: new FormControl('')
  });
}

describe('TextareaComponent', () => {
  let component: TextareaComponent;
  let fixture: ComponentFixture<TestTextareaComponent>;
  let wrapperEl: HTMLDivElement;
  let inputs: HTMLTextAreaElement[];

  beforeEach(async(() => {
    const NG_CONTROL_PROVIDER = {
      provide: NgControl,
      useClass: class extends NgControl {
        control = new FormControl();
        viewToModelUpdate(): void { }
      }};

    TestBed.configureTestingModule({
        imports: [ReactiveFormsModule, FormsModule, ButtonModule],
        declarations: [TextareaComponent, TestTextareaComponent],

      })
        .overrideComponent(TextareaComponent, {
          add: { providers: [NG_CONTROL_PROVIDER] },
        })
        .compileComponents();
    }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestTextareaComponent);
    component = fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();
    inputs = fixture.nativeElement.querySelectorAll('textarea');
    wrapperEl = fixture.nativeElement.querySelector('div');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('wrapper div should have class mui-textfield', () => {
    expect(wrapperEl).toHaveClass('mui-textfield');
  });

  it('form should have 2 textarea fields', () => {
    expect(inputs.length).toBe(2);
    expect(inputs[0]).toHaveClass('mui--is-not-empty');
    expect(inputs[0]).toHaveClass('mui--is-pristine');
    expect(inputs[0]).toHaveClass('mui--is-untouched');
    expect(inputs[0].rows).toEqual(2);
    expect(inputs[1]).toHaveClass('mui--is-empty');
    expect(inputs[1].rows).toEqual(5);
  });

  it('notes should default to This is default text', () => {
    expect(inputs[0].value).toEqual('This is default text');
  });

  it('form should be valid', () => {
    const form = fixture.componentInstance.basicForm;
    expect(form.valid).toBeTruthy();
  });

  it('textarea description should read THE DESCRIPTION WAS MODIFIED after update', () => {
    const form = fixture.componentInstance.basicForm;
    inputs[1].value = 'THE DESCRIPTION WAS MODIFIED';
    inputs[1].dispatchEvent(new Event('input'));
    inputs[1].dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    expect(form.controls.description.value).toEqual('THE DESCRIPTION WAS MODIFIED');
    expect(inputs[1]).toHaveClass('mui--is-dirty');
    expect(inputs[1]).toHaveClass('mui--is-not-empty');
    expect(inputs[1]).toHaveClass('mui--is-touched');
  });

});
