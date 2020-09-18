import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppbarModule as MuiAppbarModule } from 'mui-angular/appbar';
import { ButtonModule as MuiButtonModule } from 'mui-angular/button';
import { ColModule as MuiColModule } from 'mui-angular/col';
import { ContainerModule as MuiContainerModule } from 'mui-angular/container';
import { PanelModule as MuiPanelModule } from 'mui-angular/panel';
import { RowModule as MuiRowModule } from 'mui-angular/row';
import { DividerModule as MuiDividerModule } from 'mui-angular/divider';

import { HomePageComponent } from './home-page';
import { AppbarPageComponent } from './appbar-page';
import { ButtonPageComponent } from './button-page';
import { GridPageComponent} from './grid-page';
import { DividerPageComponent } from './divider-page';
import { PanelPageComponent } from './panel-page';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    AppbarPageComponent,
    ButtonPageComponent,
    GridPageComponent,
    DividerPageComponent,
    PanelPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
