import { AfterViewInit, Component, ElementRef, Input, Renderer2, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
    selector: 'mui-checkbox',
    template: `
        <div class="mui-checkbox">
            <label>
                <input type="checkbox" #input
                    value={{value}}
                    (change)="onChange($event.target.checked)"
                    (blur)="onTouched()"
                    (click)="onClick($event)"
                    [disabled]="disabled">
            {{label}}</label>
        </div>
    `
})
export class CheckboxComponent implements AfterViewInit, ControlValueAccessor {
    @Input() disabled?: boolean = false;

    @Input() id?: any;

    @Input() label?: string;

    @Input() required?: boolean = false;

    @Input() value: string;

    @ViewChild('input', { static: true, read: ElementRef }) input: ElementRef;

    constructor(@Self() public ngControl: NgControl, private renderer: Renderer2, private wrapper: ElementRef) {
        ngControl.valueAccessor = this;
    }

    ngAfterViewInit(): void {
        // cache references to input and wrapper
        const inputEl: HTMLInputElement = this.input.nativeElement;
        const wrapperEl: HTMLElement = this.wrapper.nativeElement;

        // id - move from wrapper to input in case users want to access input by id
        if (this.id) {
            this.renderer.setAttribute(inputEl, 'id', this.id);
            this.renderer.removeAttribute(wrapperEl, 'id');
        }

        // required
        this.renderer.setProperty(inputEl, 'required', this.required);
        
        /**
         * name - gets set on NgControl through inputs for NgModel and formControlName directives only.
         * Does not work for standalone FormControl directive
         */
        if (this.ngControl.name) {
            this.renderer.setAttribute(inputEl, 'name', this.ngControl.name.toString());
        } else {
            console.warn(`
                It looks like you're using formControl which does not have an input for the
                name attribute.  If the name attribute is required (i.e. when submitting a form),
                it is recommended to use either ngModel or formControlName.`);
        }
    }

    onClick(event: Event): void {
        event.stopPropagation();
    }

    /**
     * This code listens for updates from the component and
     * writes them to the native <input> element
     *
     * NOTE: writeValue gets called before ngOnInit Angular issue #29218
     * Side effect of the issue is that trying to access the inputEl
     * cached in ngOnInit will result in undefined error in writeValue.
     * This also requires ViewChild({static: true}) in order for input to
     * be available before onChanges is called.
     * @param value - value from <mui-checkbox>
     */
    writeValue(value: any): void {
        this.renderer.setProperty(this.input.nativeElement, 'checked', value);
    }

    /**
     * Code below this point is all boilerplate - DO NOT CHANGE
     */
    onTouched = () => { };
    onChange = (_: any) => { };

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState?(disabled: boolean): void {
        this.disabled = disabled;
    }
}

