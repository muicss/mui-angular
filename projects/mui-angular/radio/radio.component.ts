import { AfterViewInit, Component, ElementRef, EventEmitter, Injectable, Input, OnDestroy, OnInit, Output, Renderer2, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class RadioGroupService {
  private radios: RadioComponent[] = [];
  private selected: RadioComponent = null;

  // add a control to the service
  add(accessor: RadioComponent): void {
    this.radios.push(accessor);
  }

  // remove a control from the service
  remove(accessor: RadioComponent): void {
    for (let i = this.radios.length - 1; i >= 0; --i) {
      if (this.radios[i] === accessor) {
        this.radios.splice(i, 1);
        return;
      }
    }
  }

  // select the chosen radio
  select(accessor: RadioComponent): void {
    // determine if accessor is already selected
    const alreadySelected = this.selected !== null && this.selected.value === accessor.value;
    if (this.radios && !alreadySelected) {
      this.selected = null;
      this.radios.forEach((radio) => {

        // set checked status for each radio in the same group
        if (this.isSameGroup(radio, accessor)) {
          radio.writeValue(accessor.value);
        }
      });

      // set selected radio
      this.selected = accessor;
    }
  }

  // check if accessor belongs to the same group
  private isSameGroup(radio: RadioComponent, accessor: RadioComponent): boolean {
    if (!radio.ngControl.control) { return false; }
    return radio.ngControl.name === accessor.ngControl.name;
  }
}

@Component({
  selector: 'mui-radio',
  template: `
    <div class="mui-radio">
      <label>
        <input type="radio" #input
          value={{value}}
          (click)="onClick($event)"
          (change)="select($event)"
          [disabled]="disabled"
          [required]="required">
      {{label}}</label>
    </div>
  `
})
export class RadioComponent implements AfterViewInit, ControlValueAccessor, OnInit, OnDestroy {

  constructor(
    @Self() public ngControl: NgControl,
    private renderer: Renderer2,
    private wrapper: ElementRef,
    private service: RadioGroupService) {

    // set control value accessor
    ngControl.valueAccessor = this;
  }

  @Input() disabled?: boolean = false;

  @Input() id?: any;

  @Input() label?: string;

  @Input() required?: boolean = false;

  @Input() value: string;

  @Output() changed: EventEmitter<RadioComponent> = new EventEmitter<RadioComponent>();

  @ViewChild('input', { static: true, read: ElementRef }) input: ElementRef;

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

  ngOnDestroy(): void {
    this.service.remove(this);
  }

  ngOnInit(): void {
    this.service.add(this);
  }

  onClick(event: any): void {
    event.stopPropagation();
  }

  select(event: Event): void {
    event.stopPropagation();

    // select radio from the registry
    this.service.select(this);

    // notify outer component of new selected radio
    this.onChange(this.value);

    // emit changes (radio-group is listening for this output)
    this.changed.emit(this);
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
   * @param value - value from <mui-radio>
   */
  writeValue(value: any): void {
    // since radios can be grouped, compare incoming value against this radio's value
    const state = value === this.value;

    // matching value is checked, non-matching value is unchecked
    this.renderer.setProperty(this.input.nativeElement, 'checked', state);
  }

  /**
   * Code below this point is all boilerplate - DO NOT CHANGE
   */
  onTouched = () => { };
  onChange = (_: any) => { };

  registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(disabled: boolean): void {
    this.disabled = disabled;
  }
}


