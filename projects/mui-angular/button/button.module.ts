import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonComponent } from './button.component';
import { RippleDirective} from './ripple.directive';

@NgModule({
  declarations: [
    ButtonComponent, RippleDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ButtonComponent, RippleDirective
  ]
})

export class ButtonModule { }
