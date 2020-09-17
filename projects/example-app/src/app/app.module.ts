import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppbarModule as MuiAppbarModule } from 'mui-angular/appbar';
import { ButtonModule as MuiButtonModule } from 'mui-angular/button';
import { ColModule as MuiColModule } from 'mui-angular/col';
import { ContainerModule as MuiContainerModule } from 'mui-angular/container';
import { PanelModule as MuiPanelModule } from 'mui-angular/panel';
import { RowModule as MuiRowModule } from 'mui-angular/row';
import { DividerModule as MuiDividerModule } from 'mui-angular/divider';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MuiAppbarModule,
    MuiButtonModule,
    MuiColModule,
    MuiContainerModule,
    MuiPanelModule,
    MuiRowModule,
    MuiDividerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})


export class AppModule { }
