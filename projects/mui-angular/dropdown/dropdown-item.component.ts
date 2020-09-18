import { Component, Input, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'mui-dropdown-item',
  template: `
  <ng-template #templateref>
    <li><a href="{{link}}"><ng-content></ng-content></a></li>
  </ng-template>
  `,
  styles: [
  ]
})
export class DropdownItemComponent {

  @Input() link: string;

  @ViewChild('templateref', {static: true})
  public itemTemplate: TemplateRef<any>;

  constructor() {}

}
