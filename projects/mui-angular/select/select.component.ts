import { AfterViewInit, Component, ContentChildren, ElementRef, Input,
  QueryList, Renderer2, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { OptionComponent } from './option.component';

@Component({
 selector: 'mui-select',
 template: `
  <div class="mui-select">
    <select #select
      (change)="onChange($event.target.value)"
      (blur)="onTouched()"
      [disabled]="disabled"
      [required]="required"
      [ngClass]="{'mui--text-placeholder': ngControl.value === ''}">
      <ng-container *ngFor="let option of options">
        <ng-container [ngTemplateOutlet]="option.optionTemplate"></ng-container>
      </ng-container>
    </select>
    <label tabindex="-1">{{label}}</label>
  </div>
 `
})

export class SelectComponent implements AfterViewInit, ControlValueAccessor {
 @Input() autofocus?: boolean = false;

 @Input() disabled?: boolean = false;

 @Input() id?: any;

 @Input() label?: string;

 @Input() required?: boolean = false;

 @ContentChildren(OptionComponent) options: QueryList<OptionComponent>;

 @ViewChild('select', { static: true, read: ElementRef }) select: ElementRef;

 constructor(@Self() public ngControl: NgControl, private renderer: Renderer2, private wrapper: ElementRef) {
   ngControl.valueAccessor = this;
 }

 ngAfterViewInit(): void {
   // cache references to select and wrapper
   const selectEl: HTMLInputElement = this.select.nativeElement;
   const wrapperEl: HTMLElement = this.wrapper.nativeElement;

   // autofocus
   if (this.autofocus) { this.renderer.selectRootElement(selectEl).focus(); }

   /**
    * name - gets set on NgControl through inputs for NgModel and formControlName directives only.
    * Does not work for standalone FormControl directive
    */
   if (this.ngControl.name) {
     this.renderer.setAttribute(selectEl, 'name', this.ngControl.name.toString());
   } else {
     console.warn(`
       It looks like you're using formControl which does not have an input for the
       name attribute.  If the name attribute is required (i.e. when submitting a form),
       it is recommended to use either ngModel or formControlName.`);
   }

   // set attributes
   ['id', 'placeholder', 'required'].forEach(attrName => {
     const attrVal = this[attrName];
     if (attrVal) {
       this.renderer.setAttribute(selectEl, attrName, attrVal);
     }
   });

   // remove attributes from wrapper
   this.renderer.removeAttribute(wrapperEl, 'id');

   // set the selected index
   const index = this.options.toArray().findIndex((option) => option.value === this.ngControl.value);
   this.renderer.setProperty(this.select.nativeElement, 'selectedIndex', index);
 }

 /**
  * This code listens for updates from the component and
  * writes them to the native <select> element
  *
  * NOTE: writeValue gets called before ngOnInit Angular issue #29218
  * Side effect of the issue is that trying to access the selectEl
  * cached in ngOnInit will result in undefined error in writeValue.
  * This also requires ViewChild({static: true}) in order for select to
  * be available before onChange is called.
  * @param value - value from <mui-select>
  */
 writeValue(value: any): void {
   // update select field with value received from outer component
   this.renderer.setProperty(this.select.nativeElement, 'value', value);
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
