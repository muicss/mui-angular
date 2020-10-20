import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputComponent } from './input.component';
import { SharedModule} from 'mui-angular/shared';

@NgModule({
  declarations: [InputComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [InputComponent, SharedModule]
})

export class InputModule { }
