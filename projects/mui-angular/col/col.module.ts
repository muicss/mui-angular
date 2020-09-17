import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColComponent } from './col.component';

@NgModule({
  declarations: [ColComponent],
  imports: [
    CommonModule
  ],
  exports: [ColComponent]
})
export class ColModule { }
