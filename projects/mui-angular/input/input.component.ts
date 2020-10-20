import { AfterViewInit, Component, ElementRef, Input, Renderer2, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'mui-input',
  template: `
  <div class="mui-textfield">
      <input #input
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
      <label tabindex="-1">{{label}}</label>
    </div>
  `
})

export class InputComponent implements AfterViewInit, ControlValueAccessor {
  @Input() autofocus?: boolean = false;

  @Input() disabled?: boolean = false;

  @Input() placeholder?: string;

  @Input() id?: any;

  @Input() label?: string;

  @Input() maxlength?: string;

  @Input() minlength?: string;

  @Input() required?: boolean = false;

  @Input() type?: 'number' | 'text' | 'password' | 'email' = 'text';

  @ViewChild('input', { static: true, read: ElementRef }) input: ElementRef;

  constructor(@Self() public ngControl: NgControl, private renderer: Renderer2, private wrapper: ElementRef) {
    ngControl.valueAccessor = this;
  }

  ngAfterViewInit(): void {
    // cache references to input and wrapper
    const inputEl: HTMLInputElement = this.input.nativeElement;
    const wrapperEl: HTMLElement = this.wrapper.nativeElement;

    // autofocus
    if (this.autofocus) { this.renderer.selectRootElement(inputEl).focus(); }

    // id - move from wrapper to input in case users want to access input by id
    if (this.id) {
      this.renderer.setAttribute(inputEl, 'id', this.id);
      this.renderer.removeAttribute(wrapperEl, 'id');
    }

    // min length
    if (this.minlength) { this.renderer.setAttribute(inputEl, 'minlength', this.minlength); }

    // max length
    if (this.maxlength) { this.renderer.setAttribute(inputEl, 'maxlength', this.maxlength); }

    // name
    this.renderer.setAttribute(inputEl, 'name', this.ngControl.name.toString());

    // placeholder
    if (this.placeholder) { this.renderer.setAttribute(inputEl, 'placeholder', this.placeholder); }

    // required
    if (this.required) { this.renderer.setProperty(inputEl, 'required', true); }

    // type
    if (this.type) { this.renderer.setAttribute(inputEl, 'type', this.type); }

    // remove attributes from wrapper
    this.renderer.removeAttribute(wrapperEl, 'minlength');
    this.renderer.removeAttribute(wrapperEl, 'maxlength');
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
   * @param value - value from <mui-input>
   */
  writeValue(value: any): void {
    // update input field with value received from outer component
    this.renderer.setProperty(this.input.nativeElement, 'value', value);
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
