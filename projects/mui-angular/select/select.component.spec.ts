import { Component, DebugElement, DebugEventListener } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule, NgModel, NgForm } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { SelectComponent } from './select.component';
import { OptionComponent } from './option.component';

@Component({
    template: `
      <mui-select [formControl]="formControlSelect">
        <mui-option value="option-1" label="Option 1"></mui-option>
        <mui-option value="option-2" label="Option 2"></mui-option>
        <mui-option value="option-3" label="Option 3"></mui-option>
        <mui-option value="option-4" label="Option 4" disabled="true"></mui-option>
      </mui-select>
  `
})

class SelectWithFormControlComponent {
    formControlSelect: FormControl = new FormControl('', Validators.required);
}

@Component({
    template: `
    <form class="mui-form" [formGroup]="selectForm">
      <mui-select formControlName="select">
        <mui-option value="option-1" label="Option 1"></mui-option>
        <mui-option value="option-2" label="Option 2"></mui-option>
        <mui-option value="option-3" label="Option 3"></mui-option>
        <mui-option value="option-4" label="Option 4" disabled="true"></mui-option>
      </mui-select>
    </form>
  `
})

class SelectWithFormControlNameComponent {
    selectForm = new FormGroup({
        select: new FormControl('', Validators.required)
    });
}

@Component({
    template: `
    <form class="mui-form" #s="ngForm">
      <mui-select [(ngModel)]="selectValue" name="selectValue" required="true">
        <mui-option value="option-1" label="Option 1"></mui-option>
        <mui-option value="option-2" label="Option 2"></mui-option>
        <mui-option value="option-3" label="Option 3"></mui-option>
        <mui-option value="option-4" label="Option 4" disabled="true"></mui-option>
      </mui-select>
    </form>
  `
})

class SelectWithNgModelComponent {
    selectValue: any = '';
}

describe('SelectComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule],
            declarations: [
                SelectWithFormControlComponent,
                SelectWithFormControlNameComponent,
                SelectWithNgModelComponent,
                SelectComponent,
                OptionComponent
            ]
        });
        TestBed.compileComponents();
    }));

    describe('FormControl select', () => {
        let fixture: ComponentFixture<SelectWithFormControlComponent>;
        let testComponent: SelectWithFormControlComponent;
        let selectDebugElement: DebugElement;
        let selectNativeElement: HTMLElement;
        let selectInstance: SelectComponent;
        let selectInputElement: HTMLSelectElement;
        let optionDebugElements: DebugElement[];
        let optionInstances: OptionComponent[];
        let innerOptions: DebugElement[];

        beforeEach(async(() => {
            fixture = TestBed.createComponent(SelectWithFormControlComponent);
            fixture.detectChanges();

            testComponent = fixture.debugElement.componentInstance;

            selectDebugElement = fixture.debugElement.query(By.directive(SelectComponent));
            selectInstance = selectDebugElement.injector.get<SelectComponent>(SelectComponent);
            selectNativeElement = selectDebugElement.nativeElement;
            selectInputElement = selectDebugElement.query(By.css('select')).nativeElement;

            optionDebugElements = fixture.debugElement.queryAll(By.directive(OptionComponent));
            optionInstances = optionDebugElements.map(debugEl => debugEl.componentInstance);
            innerOptions = fixture.debugElement.queryAll(By.css('option'));
        }));

        it('should create', () => {
            expect(testComponent).toBeTruthy();
        });

        it('should be empty', () => {
            expect(testComponent.formControlSelect.value).toBeFalsy();
            expect(selectInputElement.selectedIndex).toEqual(-1);
        });

        it('should call onChange and set form control when an option when it is selected', () => {
            spyOn(selectInstance, 'onChange').and.callThrough();
            selectInputElement.value = innerOptions[0].nativeElement.value;
            selectInputElement.dispatchEvent(new Event('change'));
            fixture.detectChanges();

            expect(selectInstance.ngControl.value).toBe(innerOptions[0].nativeElement.value);
            expect(selectInstance.onChange).toHaveBeenCalledTimes(1);

        });

        it('should select option when setting form control value', () => {
            testComponent.formControlSelect.setValue(innerOptions[3].nativeElement.value);
            fixture.detectChanges();

            expect(selectInputElement.value).toEqual(innerOptions[3].nativeElement.value);
            expect(selectInputElement.selectedIndex).toEqual(3);
        });

        it('should disable select when form control is disabled', () => {
            testComponent.formControlSelect.disable();
            fixture.detectChanges();

            expect(selectInputElement.disabled).toBeTrue();
        });

        it('should disable change interaction when form control is disabled', () => {
            testComponent.formControlSelect.disable();
            fixture.detectChanges();

            spyOn(selectInstance, 'onChange');
            selectInputElement.value = innerOptions[0].nativeElement.value;
            selectInputElement.dispatchEvent(new Event('change'));
            fixture.detectChanges();

            expect(testComponent.formControlSelect.value).toBeFalsy();
        });

        it('should set option to disabled', () => {
            expect(innerOptions[3].nativeElement.disabled).toBeTrue();
        });

    });

    describe('FormControlName select', () => {
        let fixture: ComponentFixture<SelectWithFormControlNameComponent>;
        let testComponent: SelectWithFormControlNameComponent;
        let selectDebugElement: DebugElement;
        let selectNativeElement: HTMLElement;
        let selectInstance: SelectComponent;
        let selectInputElement: HTMLSelectElement;
        let optionDebugElements: DebugElement[];
        let optionInstances: OptionComponent[];
        let innerOptions: DebugElement[];

        beforeEach(async(() => {
            fixture = TestBed.createComponent(SelectWithFormControlNameComponent);
            fixture.detectChanges();

            testComponent = fixture.debugElement.componentInstance;

            selectDebugElement = fixture.debugElement.query(By.directive(SelectComponent));
            selectInstance = selectDebugElement.injector.get<SelectComponent>(SelectComponent);
            selectNativeElement = selectDebugElement.nativeElement;
            selectInputElement = selectDebugElement.query(By.css('select')).nativeElement;

            optionDebugElements = fixture.debugElement.queryAll(By.directive(OptionComponent));
            optionInstances = optionDebugElements.map(debugEl => debugEl.componentInstance);
            innerOptions = fixture.debugElement.queryAll(By.css('option'));
        }));

        it('should create', () => {
            expect(testComponent).toBeTruthy();
        });

        it('should be empty', () => {
            expect(testComponent.selectForm.controls.select.value).toBeFalsy();
            expect(selectInputElement.selectedIndex).toEqual(-1);
        });

        it('should call onChange and set form control when an option when it is selected', () => {
            spyOn(selectInstance, 'onChange').and.callThrough();
            selectInputElement.value = innerOptions[0].nativeElement.value;
            selectInputElement.dispatchEvent(new Event('change'));
            fixture.detectChanges();

            expect(selectInstance.ngControl.value).toBe(innerOptions[0].nativeElement.value);
            expect(selectInstance.onChange).toHaveBeenCalledTimes(1);

        });

        it('should select option when setting form control value', () => {
            testComponent.selectForm.controls.select.setValue(innerOptions[3].nativeElement.value);
            fixture.detectChanges();

            expect(selectInputElement.value).toEqual(innerOptions[3].nativeElement.value);
            expect(selectInputElement.selectedIndex).toEqual(3);
        });

        it('should disable select when form control is disabled', () => {
            testComponent.selectForm.controls.select.disable();
            fixture.detectChanges();

            expect(selectInputElement.disabled).toBeTrue();
        });

        it('should disable change interaction when form control is disabled', () => {
            testComponent.selectForm.controls.select.disable();
            fixture.detectChanges();

            spyOn(selectInstance, 'onChange');
            selectInputElement.value = innerOptions[0].nativeElement.value;
            selectInputElement.dispatchEvent(new Event('change'));
            fixture.detectChanges();

            expect(testComponent.selectForm.controls.select.value).toBeFalsy();
        });

        it('should set option to disabled', () => {
            expect(innerOptions[3].nativeElement.disabled).toBeTrue();
        });

        it('should set form to valid when option is selected', () => {
            expect(testComponent.selectForm.valid).toBeFalse();

            selectInputElement.value = innerOptions[0].nativeElement.value;
            selectInputElement.dispatchEvent(new Event('change'));
            fixture.detectChanges();

            expect(testComponent.selectForm.valid).toBeTrue();
        });

    });

    describe('NgModel select', () => {
        let fixture: ComponentFixture<SelectWithNgModelComponent>;
        let testComponent: SelectWithNgModelComponent;
        let selectDebugElement: DebugElement;
        let selectNativeElement: HTMLElement;
        let selectInstance: SelectComponent;
        let selectInputElement: HTMLSelectElement;
        let optionDebugElements: DebugElement[];
        let optionInstances: OptionComponent[];
        let innerOptions: DebugElement[];
        let form: NgForm;

        beforeEach(async(() => {
            fixture = TestBed.createComponent(SelectWithNgModelComponent);
            fixture.detectChanges();

            testComponent = fixture.debugElement.componentInstance;

            selectDebugElement = fixture.debugElement.query(By.directive(SelectComponent));
            selectInstance = selectDebugElement.injector.get<SelectComponent>(SelectComponent);
            selectNativeElement = selectDebugElement.nativeElement;
            selectInputElement = selectDebugElement.query(By.css('select')).nativeElement;

            optionDebugElements = fixture.debugElement.queryAll(By.directive(OptionComponent));
            optionInstances = optionDebugElements.map(debugEl => debugEl.componentInstance);
            innerOptions = fixture.debugElement.queryAll(By.css('option'));

            const formElement = fixture.debugElement.children[0];
            form = formElement.injector.get(NgForm);
        }));

        it('should create', () => {
            expect(testComponent).toBeTruthy();
        });

        it('should be empty', () => {
            expect(testComponent.selectValue).toBeFalsy();
            expect(selectInputElement.selectedIndex).toEqual(-1);
        });

        it('should call onChange and set form control when an option when it is selected', () => {
            spyOn(selectInstance, 'onChange').and.callThrough();
            selectInputElement.value = innerOptions[0].nativeElement.value;
            selectInputElement.dispatchEvent(new Event('change'));
            fixture.detectChanges();

            expect(selectInstance.ngControl.value).toBe(innerOptions[0].nativeElement.value);
            expect(selectInstance.onChange).toHaveBeenCalledTimes(1);

        });

        it('should select option when setting ngModel value', fakeAsync(() => {
            testComponent.selectValue = innerOptions[3].nativeElement.value;
            fixture.detectChanges();
            tick();

            expect(selectInputElement.value).toEqual(innerOptions[3].nativeElement.value);
            expect(selectInputElement.selectedIndex).toEqual(3);
        }));

        it('should disable select when form control is disabled', () => {
            selectInstance.disabled = true;
            fixture.detectChanges();

            expect(selectInputElement.disabled).toBeTrue();
        });

        it('should disable change interaction when form control is disabled', () => {
            selectInstance.disabled = true;
            fixture.detectChanges();

            spyOn(selectInstance, 'onChange');
            selectInputElement.value = innerOptions[0].nativeElement.value;
            selectInputElement.dispatchEvent(new Event('change'));
            fixture.detectChanges();

            expect(testComponent.selectValue).toBeFalsy();
        });

        it('should set option to disabled', () => {
            expect(innerOptions[3].nativeElement.disabled).toBeTrue();
        });

        it('should set form to valid when option is selected', fakeAsync(() => {
            expect(form.valid).toBe(false);

            selectInputElement.value = innerOptions[0].nativeElement.value;
            selectInputElement.dispatchEvent(new Event('change'));
            fixture.detectChanges();
            tick();

            expect(form.valid).toBe(true);
        }));

    });


});
