import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppbarComponent } from './appbar.component';

@NgModule({
  declarations: [AppbarComponent],
  imports: [
    CommonModule
  ],
  exports: [AppbarComponent]
})

export class AppbarModule { }
