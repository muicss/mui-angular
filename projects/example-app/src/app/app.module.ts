import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MuiAngularModule } from 'mui-angular';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MuiAngularModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
