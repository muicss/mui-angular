import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule, NgModel } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { CheckboxComponent } from './checkbox.component';

@Component({
    template: `
    <form class="mui-form" [formGroup]="singleCheckForm">
        <mui-checkbox id="single-check" label="Single checkbox" value="single" formControlName="singleCheck"></mui-checkbox>
    </form>
  `
})

class SingleCheckboxComponent {
    singleCheckForm = new FormGroup({
        singleCheck: new FormControl(false)
    });
}

@Component({
    template: `
    <form class="mui-form" [formGroup]="multiCheckForm">
        <mui-checkbox id="multi-1" label="Option 1" value="one" formControlName="oneCheck"></mui-checkbox>
        <mui-checkbox id="multi-2" label="Option 2" value="two" formControlName="twoCheck"></mui-checkbox>
    </form>
  `
})

class MultipleCheckboxComponent {
    multiCheckForm = new FormGroup({
        oneCheck: new FormControl(false),
        twoCheck: new FormControl(false)
    });
}

@Component({
    template: `
    <form class="mui-form" #c="ngForm">
      <mui-checkbox id="ngModel-check" label="NgModel Check" value="one" [(ngModel)]="checkValue" name="checkValue"></mui-checkbox>
    </form>
  `
})

class NgModelCheckboxComponent {
    checkValue: any = false;
}

@Component({
    template: `
        <mui-checkbox id="formControl-check" label="Standalone checkbox" value="alone" [formControl]="formControlCheck"></mui-checkbox>
  `
})

class FormControlCheckboxComponent {
    formControlCheck: FormControl = new FormControl(false);
}

describe('CheckboxComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule],
            declarations: [
                SingleCheckboxComponent,
                MultipleCheckboxComponent,
                NgModelCheckboxComponent,
                FormControlCheckboxComponent,
                CheckboxComponent
            ]
        });
        TestBed.compileComponents();
    }));

    describe('Single checkbox', () => {
        let fixture: ComponentFixture<SingleCheckboxComponent>;
        let testComponent: SingleCheckboxComponent;
        let checkboxDebugElement: DebugElement;
        let checkboxNativeElement: HTMLElement;
        let checkboxInstance: CheckboxComponent;
        let checkBoxInputElement: HTMLInputElement;

        beforeEach(async(() => {
            fixture = TestBed.createComponent(SingleCheckboxComponent);
            fixture.detectChanges();

            testComponent = fixture.debugElement.componentInstance;

            checkboxDebugElement = fixture.debugElement.query(By.directive(CheckboxComponent));
            checkboxInstance = checkboxDebugElement.injector.get<CheckboxComponent>(CheckboxComponent);
            checkboxNativeElement = checkboxDebugElement.nativeElement;
            checkBoxInputElement = checkboxDebugElement.query(By.css('input')).nativeElement;
        }));

        it('should add and remove the checked state', () => {
            expect(checkBoxInputElement.checked).toBe(false);

            testComponent.singleCheckForm.controls.singleCheck.setValue(true);
            fixture.detectChanges();

            expect(checkBoxInputElement.checked).toBe(true);

            testComponent.singleCheckForm.controls.singleCheck.setValue(false);
            fixture.detectChanges();

            expect(checkBoxInputElement.checked).toBe(false);
        });

        it('should toggle checked state on click', () => {
            expect(checkBoxInputElement.checked).toBe(false);

            checkBoxInputElement.click();
            fixture.detectChanges();

            expect(checkBoxInputElement.checked).toBe(true);

            checkBoxInputElement.click();
            fixture.detectChanges();

            expect(checkBoxInputElement.checked).toBe(false);
        });

        it('should not toggle `checked` state upon interation while disabled', () => {
            testComponent.singleCheckForm.controls.singleCheck.disable();
            fixture.detectChanges();

            checkBoxInputElement.click();
            fixture.detectChanges();

            expect(checkBoxInputElement.checked).toBe(false);
        });

        it('should copy the user-provided id', () => {
            expect(checkboxNativeElement.id).toBeFalsy();

            expect(checkBoxInputElement.id).toBe('single-check');
        });
    });

    describe('with multiple checkboxes', () => {
        let fixture: ComponentFixture<MultipleCheckboxComponent>;
        beforeEach(() => {
            fixture = TestBed.createComponent(MultipleCheckboxComponent);
            fixture.detectChanges();
        });

        it('should assign a unique id to each checkbox', () => {
            const [firstId, secondId] =
                fixture.debugElement.queryAll(By.directive(CheckboxComponent))
                    .map(debugElement => debugElement.nativeElement.querySelector('input').id);

            expect(firstId).toEqual('multi-1');
            expect(secondId).toEqual('multi-2');
            expect(firstId).not.toEqual(secondId);
        });
    });

    describe('NgModel checkbox', () => {
        let fixture: ComponentFixture<NgModelCheckboxComponent>;
        let testComponent: NgModelCheckboxComponent;
        let checkboxDebugElement: DebugElement;
        let checkboxNativeElement: HTMLElement;
        let checkboxInstance: CheckboxComponent;
        let checkBoxInputElement: HTMLInputElement;
        let ngModel: NgModel;

        beforeEach(async(() => {
            fixture = TestBed.createComponent(NgModelCheckboxComponent);
            fixture.detectChanges();

            testComponent = fixture.debugElement.componentInstance;

            checkboxDebugElement = fixture.debugElement.query(By.directive(CheckboxComponent));
            checkboxInstance = checkboxDebugElement.injector.get<CheckboxComponent>(CheckboxComponent);
            checkboxNativeElement = checkboxDebugElement.nativeElement;
            checkBoxInputElement = checkboxDebugElement.query(By.css('input')).nativeElement;
            ngModel = checkboxDebugElement.injector.get<NgModel>(NgModel);
        }));

        it('should add and remove the checked state', fakeAsync(() => {
            expect(checkBoxInputElement.checked).toBe(false);

            testComponent.checkValue = true;
            fixture.detectChanges();
            tick();
            expect(checkBoxInputElement.checked).toBe(true);

            testComponent.checkValue = false;
            fixture.detectChanges();
            tick();

            expect(checkBoxInputElement.checked).toBe(false);
        }));

        it('should toggle checked state on click', fakeAsync(() => {
            expect(checkBoxInputElement.checked).toBe(false);

            checkBoxInputElement.click();
            fixture.detectChanges();
            tick();

            expect(checkBoxInputElement.checked).toBe(true);

            checkBoxInputElement.click();
            fixture.detectChanges();
            tick();

            expect(checkBoxInputElement.checked).toBe(false);
        }));

        it('should copy the user-provided id', () => {
            expect(checkboxNativeElement.id).toBeFalsy();

            expect(checkBoxInputElement.id).toBe('ngModel-check');
        });

        it('should not toggle `checked` state upon interation while disabled', fakeAsync(() => {
            checkboxInstance.ngControl.control.disable();
            fixture.detectChanges();
            tick();

            checkBoxInputElement.click();
            fixture.detectChanges();

            expect(checkBoxInputElement.checked).toBe(false);
        }));
    });

    describe('FormControl checkbox', () => {
        let fixture: ComponentFixture<FormControlCheckboxComponent>;
        let testComponent: FormControlCheckboxComponent;
        let checkboxDebugElement: DebugElement;
        let checkboxNativeElement: HTMLElement;
        let checkboxInstance: CheckboxComponent;
        let checkBoxInputElement: HTMLInputElement;

        beforeEach(async(() => {
            fixture = TestBed.createComponent(FormControlCheckboxComponent);
            fixture.detectChanges();

            testComponent = fixture.debugElement.componentInstance;

            checkboxDebugElement = fixture.debugElement.query(By.directive(CheckboxComponent));
            checkboxInstance = checkboxDebugElement.injector.get<CheckboxComponent>(CheckboxComponent);
            checkboxNativeElement = checkboxDebugElement.nativeElement;
            checkBoxInputElement = checkboxDebugElement.query(By.css('input')).nativeElement;
        }));

        it('should add and remove the checked state', () => {
            expect(checkBoxInputElement.checked).toBe(false);

            testComponent.formControlCheck.setValue(true);
            fixture.detectChanges();

            expect(checkBoxInputElement.checked).toBe(true);

            testComponent.formControlCheck.setValue(false);
            fixture.detectChanges();

            expect(checkBoxInputElement.checked).toBe(false);
        });

        it('should toggle checked state on click', () => {
            expect(checkBoxInputElement.checked).toBe(false);

            checkBoxInputElement.click();
            fixture.detectChanges();

            expect(checkBoxInputElement.checked).toBe(true);

            checkBoxInputElement.click();
            fixture.detectChanges();

            expect(checkBoxInputElement.checked).toBe(false);
        });

        it('should not toggle `checked` state upon interation while disabled', () => {
            testComponent.formControlCheck.disable();
            fixture.detectChanges();

            checkBoxInputElement.click();
            fixture.detectChanges();

            expect(checkBoxInputElement.checked).toBe(false);
        });

        it('should copy the user-provided id', () => {
            expect(checkboxNativeElement.id).toBeFalsy();

            expect(checkBoxInputElement.id).toBe('formControl-check');
        });
    });

});
