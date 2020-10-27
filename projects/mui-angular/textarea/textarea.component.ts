import { AfterViewInit, Component, ElementRef, Input, Renderer2, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'mui-textarea',
  template: `
    <div class="mui-textfield">
        <textarea #textarea
            [ngClass]="{
            'mui--is-dirty': ngControl.dirty,
            'mui--is-empty': !ngControl.value,
            'mui--is-invalid': ngControl.invalid,
            'mui--is-not-empty': ngControl.value,
            'mui--is-pristine': ngControl.pristine,
            'mui--is-touched': ngControl.touched,
            'mui--is-untouched': ngControl.untouched}"
            (input)="onChange($event.target.value)"
            (blur)="onTouched()"
            [disabled]="disabled">
        </textarea>
        <label tabindex="-1">{{label}}</label>
    </div>
  `
})

export class TextareaComponent implements AfterViewInit, ControlValueAccessor {
  @Input() autofocus?: boolean = false;

  @Input() disabled?: boolean = false;

  @Input() placeholder?: string;

  @Input() id?: any;

  @Input() label?: string;

  @Input() maxlength?: string;

  @Input() required?: boolean = false;

  @Input() rows?: string = '2';

  @ViewChild('textarea', { static: true, read: ElementRef }) textarea: ElementRef;

  constructor(@Self() public ngControl: NgControl, private renderer: Renderer2, private wrapper: ElementRef) {
    ngControl.valueAccessor = this;
  }

  ngAfterViewInit(): void {
    // cache references to input and wrapper
    const inputEl: HTMLTextAreaElement = this.textarea.nativeElement;
    const wrapperEl: HTMLElement = this.wrapper.nativeElement;

    // autofocus
    if (this.autofocus) { this.renderer.selectRootElement(inputEl).focus(); }

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

    // set attributes
    ['id', 'maxlength', 'placeholder', 'required', 'rows'].forEach(attrName => {
      const attrVal = this[attrName];
      if (attrVal) {
        this.renderer.setAttribute(inputEl, attrName, attrVal);
      }
    });

    // remove attributes from wrapper
    this.renderer.removeAttribute(wrapperEl, 'maxlength');
    this.renderer.removeAttribute(wrapperEl, 'id');
  }

  /**
   * This code listens for updates from the component and
   * writes them to the native <textarea> element
   *
   * NOTE: writeValue gets called before ngOnInit Angular issue #29218
   * Side effect of the issue is that trying to access the inputEl
   * cached in ngOnInit will result in undefined error in writeValue.
   * This also requires ViewChild({static: true}) in order for input to
   * be available before onChanges is called.
   * @param value - value from <mui-textarea>
   */
  writeValue(value: any): void {
    // update input field with value received from outer component
    this.renderer.setProperty(this.textarea.nativeElement, 'value', value);
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
