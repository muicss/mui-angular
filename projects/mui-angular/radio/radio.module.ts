import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RadioComponent, RadioGroupService } from './radio.component';

@NgModule({
  declarations: [RadioComponent],
  imports: [
    CommonModule
  ],
  exports: [RadioComponent],
  providers: [RadioGroupService]
})

export class RadioModule { }
