import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FloatLabelDirective } from './float-label.directive';


@NgModule({
  declarations: [FloatLabelDirective],
  imports: [
    CommonModule
  ],
  exports: [FloatLabelDirective]
})

export class SharedModule { }
