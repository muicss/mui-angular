import { AfterViewInit, Component, ElementRef, Input, Renderer2, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'mui-textarea',
  template: `
    <div class="mui-textfield">
        <textarea #textarea
            [ngClass]="{
            'mui--is-dirty': control.dirty,
            'mui--is-empty': !control.value,
            'mui--is-invalid': control.invalid,
            'mui--is-not-empty': control.value,
            'mui--is-pristine': control.pristine,
            'mui--is-touched': control.touched,
            'mui--is-untouched': control.untouched}"
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

  @Input() name?: string;

  @Input() required?: boolean = false;

  @Input() rows?: string = '2';

  @ViewChild('textarea', { static: true, read: ElementRef }) textarea: ElementRef;

  constructor(@Self() public control: NgControl, private renderer: Renderer2, private wrapper: ElementRef) {
    control.valueAccessor = this;
  }

  ngAfterViewInit(): void {
    // cache references to input and wrapper
    const textareaEl: HTMLTextAreaElement = this.textarea.nativeElement;
    const wrapperEl: HTMLElement = this.wrapper.nativeElement;

    // autofocus
    if (this.autofocus) { this.renderer.selectRootElement(textareaEl).focus(); }

    // id - move from wrapper to input in case users want to access input by id
    if (this.id) {
      this.renderer.setAttribute(textareaEl, 'id', this.id);
      this.renderer.removeAttribute(wrapperEl, 'id');
    }

    // max length
    if (this.maxlength) { this.renderer.setAttribute(textareaEl, 'maxlength', this.maxlength); }

    // name
    if (this.name) { this.renderer.setAttribute(textareaEl, 'name', this.name); }

    // placeholder
    if (this.placeholder) { this.renderer.setAttribute(textareaEl, 'placeholder', this.placeholder); }

    // required
    if (this.required) { this.renderer.setProperty(textareaEl, 'required', true); }

    // rows
    if (this.rows) { this.renderer.setAttribute(textareaEl, 'rows', this.rows); }

    // remove attributes from wrapper
    this.renderer.removeAttribute(wrapperEl, 'maxlength');
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
