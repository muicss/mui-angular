import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';

@Component({templateUrl: 'form-page.component.html'})
export class FormPageComponent {

    constructor() { }
    // Input - reactive
    inputForm = new FormGroup({
        first: new FormControl('Mui', Validators.required),
        last: new FormControl('Css', Validators.required),
        zip: new FormControl({ value: '', disabled: true }),
        email: new FormControl('', [Validators.email, Validators.required]),
        pwd: new FormControl(''),
        notes: new FormControl('')
    });

    // Input = template driven
    first: any = 'Mui';
    last: any = '';

    // Input - standalone
    inputValue = '';
    inputControl: FormControl = new FormControl('');

    // input - inline
    inlineForm = new FormGroup({
        inlineText: new FormControl('')
    });

    // input - floating
    floatingForm = new FormGroup({
        floatingText: new FormControl('')
    });

    // radio - ractive
    radioForm = new FormGroup({
        groupA: new FormControl('', Validators.required)

    });

    // radio - template driven
    radioValue: any = '';

    // radio - standalone
    standaloneRadio: FormControl = new FormControl('');
    standaloneRadioValue: any = '';

    // checkbox - reactive
    checkForm = new FormGroup({
        checkOne: new FormControl(false, Validators.requiredTrue),
        checkTwo: new FormControl({ value: false, disabled: true }),
        checkThree: new FormControl(true)
    });

    // checkbox - template driven
    checkValueA: boolean = false;
    checkValueB: boolean;

    // checkbox - standalone
    standaloneCheck: FormControl = new FormControl(false);
    standaloneCheckValue: boolean = false;

    // select - reactive
    selectForm = new FormGroup({
        inputA: new FormControl('option-4'),
        inputB: new FormControl('', Validators.required),
        inputC: new FormControl({value: '', disabled: true}),
        inputD: new FormControl('')
    });

    // select template driven
    selectValueA: any = 'option-4';
    selectValueB: any = '';
    selectValueC: any = '';
    selectValueD: any = '';

    // select - standalone
    standaloneSelect: FormControl = new FormControl('');
    standaloneSelectValue: any = '';

    // reset input form
    submitInputReactive(): void {
        console.log('reset reactive inputForm: ', `${this.inputForm.value} | ${this.inputForm.status}`);
        this.inputForm.reset();
    }

    // reset template driven form
    submitInputTemplate(f: NgForm): void {
        console.log('reset template driven input form: ', `${f.value} | ${f.valid}`);
        f.reset();
    }

    // reset inline form
    resetInlineForm(): void {
        console.log('reset inline form: ', this.inlineForm.value);
        this.inlineForm.reset();
    }

    // reset inline form
    submitInlineForm(): void {
        console.log('submit inline form: ', this.inlineForm.value);
        this.inlineForm.reset();
    }

}
