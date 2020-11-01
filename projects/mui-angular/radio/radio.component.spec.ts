import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule, NgModel } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RadioComponent } from './radio.component';

@Component({
    template: `
    <form class="mui-form--inline" #r="ngForm">
        <mui-radio [(ngModel)]="modelValue" name="modelValue" [ngModelOptions]="{standalone: true}" label="Option 1" value="option-1"></mui-radio>
        <mui-radio [(ngModel)]="modelValue" name="modelValue" [ngModelOptions]="{standalone: true}" label="Option 2" value="option-2"></mui-radio>
        <mui-radio [(ngModel)]="modelValue" name="modelValue" [ngModelOptions]="{standalone: true}" label="Option 3" value="option-3"></mui-radio>
    </form>
  `
})
class RadiosWithNgModelComponent {
    modelValue: any = '';
}

@Component({
    template: `
    <form class="mui-form" [formGroup]="radioForm">
        <mui-radio formControlName="groupA" id="1" label="Option 1" value="a-1"></mui-radio>
        <mui-radio formControlName="groupA" id="2" label="Option 2" value="a-2"></mui-radio>
        <mui-radio formControlName="groupA" id="3" label="Option 3" value="a-3"></mui-radio>
    </form>
  `
})
class RadiosWithFormControlNameComponent {
    radioForm = new FormGroup({
        groupA: new FormControl('')
    });
}

describe('RadioComponent', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule],
            declarations: [
                RadiosWithFormControlNameComponent,
                RadiosWithNgModelComponent,
                RadioComponent
            ]
        });

        TestBed.compileComponents();
    }));

    describe('radios with formControlName', () => {
        let fixture: ComponentFixture<RadiosWithFormControlNameComponent>;
        let radioDebugElements: DebugElement[];
        let radioNativeElements: HTMLElement[];
        let radioInputElements: HTMLInputElement[];
        let radioInstances: RadioComponent[];
        let testComponent: RadiosWithFormControlNameComponent;


        beforeEach(async(() => {
            fixture = TestBed.createComponent(RadiosWithFormControlNameComponent);
            fixture.detectChanges();

            testComponent = fixture.debugElement.componentInstance;

            radioDebugElements = fixture.debugElement.queryAll(By.directive(RadioComponent));
            radioNativeElements = radioDebugElements.map(debugEl => debugEl.nativeElement);
            radioInstances = radioDebugElements.map(debugEl => debugEl.componentInstance);

            radioInputElements = radioDebugElements
                .map(debugEl => debugEl.query(By.css('input')).nativeElement);
        }));

        it('should set individual radio names based on the formControlName', () => {
            for (const radio of radioInstances) {
                expect(radio.input.nativeElement.name).toBe('groupA');
            }
        });

        it('should disable click interaction when the form control is disabled', () => {
            testComponent.radioForm.controls.groupA.disable();
            fixture.detectChanges();

            radioInputElements[0].click();
            fixture.detectChanges();

            expect(radioInstances[0].input.nativeElement.checked).toBe(false);
        });

        it('should disable each individual radio when the form control is disabled', () => {
            testComponent.radioForm.controls.groupA.disable();
            fixture.detectChanges();

            for (const radio of radioInstances) {
                expect(radio.input.nativeElement.disabled).toBe(true);
            }
        });

        it('should set status valid when control is required', () => {
            expect(testComponent.radioForm.valid).toBe(true);

            testComponent.radioForm.controls.groupA.setValidators([Validators.required]);
            testComponent.radioForm.controls.groupA.updateValueAndValidity();
            fixture.detectChanges();
            expect(testComponent.radioForm.valid).toBe(false);

            fixture.componentInstance.radioForm.controls.groupA.setValue('a-3');
            fixture.detectChanges();
            expect(testComponent.radioForm.valid).toBe(true);

        });

        it('should update form control value when one of the radios change', () => {
            expect(testComponent.radioForm.controls.groupA.value).toBeFalsy();

            radioInputElements[2].click();
            fixture.detectChanges();

            expect(radioInstances[0].input.nativeElement.checked).toBe(false);
            expect(radioInstances[1].input.nativeElement.checked).toBe(false);
            expect(radioInstances[2].input.nativeElement.checked).toBe(true);
            expect(testComponent.radioForm.controls.groupA.value).toBe('a-3');
        });

        it('should update the form control and radios when one of the radios is clicked', () => {
            expect(testComponent.radioForm.controls.groupA.value).toBeFalsy();

            radioInputElements[0].click();
            fixture.detectChanges();

            expect(testComponent.radioForm.controls.groupA.value).toBe('a-1');
            expect(radioInstances[0].input.nativeElement.checked).toBe(true);
            expect(radioInstances[1].input.nativeElement.checked).toBe(false);
            expect(radioInstances[2].input.nativeElement.checked).toBe(false);

            radioInputElements[1].click();
            fixture.detectChanges();

            expect(testComponent.radioForm.controls.groupA.value).toBe('a-2');
            expect(radioInstances[0].input.nativeElement.checked).toBe(false);
            expect(radioInstances[1].input.nativeElement.checked).toBe(true);
            expect(radioInstances[2].input.nativeElement.checked).toBe(false);
        });

        it('should update radios when setting form control', () => {
            fixture.componentInstance.radioForm.controls.groupA.setValue('a-3');
            fixture.detectChanges();

            expect(radioInstances[0].input.nativeElement.checked).toBe(false);
            expect(radioInstances[1].input.nativeElement.checked).toBe(false);
            expect(radioInstances[2].input.nativeElement.checked).toBe(true);
        });

        it('should update radios when setting form control to null programatically', () => {
            fixture.componentInstance.radioForm.controls.groupA.setValue('');
            fixture.detectChanges();

            expect(testComponent.radioForm.controls.groupA.value).toBeFalsy();
            expect(radioInstances[0].input.nativeElement.checked).toBe(false);
            expect(radioInstances[1].input.nativeElement.checked).toBe(false);
            expect(radioInstances[2].input.nativeElement.checked).toBe(false);
        });

        it('should emit a change event from radio buttons', () => {
            expect(radioInstances[0].input.nativeElement.checked).toBe(false);
            expect(radioInstances[1].input.nativeElement.checked).toBe(false);
            expect(radioInstances[2].input.nativeElement.checked).toBe(false);

            const spies = radioInstances
                .map((radio, index) => jasmine.createSpy(`selectSpy ${index} for ${radio.input.nativeElement.name}`));

            spies.forEach((spy, index) => radioInstances[index].changed.subscribe(spy));

            radioInputElements[0].click();
            fixture.detectChanges();

            expect(spies[0]).toHaveBeenCalled();

            radioInputElements[1].click();
            fixture.detectChanges();

            // To match the native radio button behavior, the change event shouldn't
            // be triggered when the radio got unselected.
            expect(spies[0]).toHaveBeenCalledTimes(1);
            expect(spies[1]).toHaveBeenCalledTimes(1);
        });
    });

    describe('radios with ngModel', () => {
        let fixture: ComponentFixture<RadiosWithNgModelComponent>;
        let radioDebugElements: DebugElement[];
        let innerRadios: DebugElement[];
        let radioInstances: RadioComponent[];
        let testComponent: RadiosWithNgModelComponent;

        beforeEach(() => {
            fixture = TestBed.createComponent(RadiosWithNgModelComponent);
            fixture.detectChanges();

            testComponent = fixture.debugElement.componentInstance;

            radioDebugElements = fixture.debugElement.queryAll(By.directive(RadioComponent));
            radioInstances = radioDebugElements.map(debugEl => debugEl.componentInstance);
            innerRadios = fixture.debugElement.queryAll(By.css('input[type="radio"]'));
        });

        it('should set individual radio names based on the group name', () => {
            for (const radio of radioInstances) {
                expect(radio.input.nativeElement.name).toBe('modelValue');
            }
        });

        it('should check the corresponding radio button on form control value change', () => {
            expect(testComponent.modelValue).toBeFalsy();
            for (const radio of radioInstances) {
                expect(radio.input.nativeElement.checked).toBeFalsy();
            }

            testComponent.modelValue = 'option-2';
            for (const radio of radioInstances) {
                expect(radio.input.nativeElement.checked).toBe(testComponent.modelValue.value === radio.value);
            }
        });

        it('should update the ngModel value when selecting a radio button', async(() => {
            innerRadios[1].nativeElement.dispatchEvent(new Event('change'));
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                expect(testComponent.modelValue).toBe('option-2');
            });
            expect(radioInstances[0].input.nativeElement.checked).toBe(false);
            expect(radioInstances[1].input.nativeElement.checked).toBe(true);
            expect(radioInstances[2].input.nativeElement.checked).toBe(false);
        }));

        it('should update the radio button when changing ngModel', async(() => {
            testComponent.modelValue = 'option-3';
            fixture.detectChanges();

            fixture.whenStable().then(() => {
                expect(innerRadios[0].nativeElement.checked).toBe(false);
                expect(innerRadios[1].nativeElement.checked).toBe(false);
                expect(innerRadios[2].nativeElement.checked).toBe(true);
            });
        }));
    });
});
