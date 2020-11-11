import { Component, ElementRef, Input, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'mui-option',
  template: `
    <ng-template #templateref>
      <option #option [disabled]="disabled" [value]="value"
        [ngClass]="{'mui--text-black': value !== '', 'mui--text-placeholder': value === ''}">
        {{label}}
      </option>
    </ng-template>
  `,
  styles: []
})
export class OptionComponent {

  @Input() disabled?: boolean = false;

  @Input() hidden: boolean = false;

  @Input() label: string;

  @Input() value: string;

  @ViewChild('templateref', {static: true}) public optionTemplate: TemplateRef<any>;

  @ViewChild('option', { static: true, read: ElementRef }) option: ElementRef;

  constructor() { }

}
