import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';

@Component({ templateUrl: 'form-page.component.html' })
export class FormPageComponent implements OnInit {
    // reactive form variables
    basicForm = new FormGroup({
        first: new FormControl('Mui', Validators.required),
        last: new FormControl('Css', Validators.required),
        zip: new FormControl({value: '', disabled: true}),
        email: new FormControl('', [Validators.email, Validators.required]),
        pwd: new FormControl(''),
        notes: new FormControl('')
    });

    // reactive floating label form variables
    floatingForm = new FormGroup({
        floatingText: new FormControl('')
    });

    // reactive inline form variables
    inlineForm = new FormGroup({
        inlineText: new FormControl('')
    });

    // template driven variables
    first: any = 'Mui';
    last: any = 'Css';


    constructor() { }

    ngOnInit(): void { }

    onSubmitReactive(): void {
        this.basicForm.reset();
    }

    onSubmitTemplate(f: NgForm): void {
        console.log(f.value);
        console.log(f.valid);
        f.reset();
    }

    resetInlineForm(): void {
        this.inlineForm.reset();
    }
}
