import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TextareaComponent } from './textarea.component';
import { SharedModule} from 'mui-angular/shared';

@NgModule({
  declarations: [TextareaComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [TextareaComponent, SharedModule]
})

export class TextareaModule { }
