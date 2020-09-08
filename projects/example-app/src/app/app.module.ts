import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppbarModule as MuiAppbarModule } from 'mui-angular/appbar';
import { ButtonModule as MuiButtonModule } from 'mui-angular/button';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MuiAppbarModule,
    MuiButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})


export class AppModule { }
