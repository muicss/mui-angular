import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from './dropdown.component';
import { DropdownItemComponent } from './dropdown-item.component';
import { ButtonModule } from 'mui-angular/button';
import { CaretModule } from 'mui-angular/caret';

@NgModule({
  declarations: [DropdownComponent, DropdownItemComponent],
  imports: [
    CommonModule,
    ButtonModule,
    CaretModule
  ],
  exports: [DropdownComponent, DropdownItemComponent]
})
export class DropdownModule { }
