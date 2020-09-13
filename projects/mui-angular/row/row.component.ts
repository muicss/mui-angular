import { Component } from '@angular/core';

@Component({
  selector: 'mui-row',
  template: `<div class="mui-row"><ng-content></ng-content></div>`,
  styles: []
})
export class RowComponent {

  constructor() { }

}
