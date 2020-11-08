import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OptionComponent } from './option.component';
import { SelectComponent } from './select.component';

@NgModule({
  declarations: [OptionComponent, SelectComponent],
  imports: [
    CommonModule
  ],
  exports: [OptionComponent, SelectComponent]
})

export class SelectModule { }
