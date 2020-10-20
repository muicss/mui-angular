import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppbarModule as MuiAppbarModule } from 'mui-angular/appbar';
import { ButtonModule as MuiButtonModule } from 'mui-angular/button';
import { ColModule as MuiColModule } from 'mui-angular/col';
import { ContainerModule as MuiContainerModule } from 'mui-angular/container';
import { PanelModule as MuiPanelModule } from 'mui-angular/panel';
import { RowModule as MuiRowModule } from 'mui-angular/row';
import { DividerModule as MuiDividerModule } from 'mui-angular/divider';
import { TabsModule as MuiTabsModule } from 'mui-angular/tabs';
import { CaretModule as MuiCaretModule } from 'mui-angular/caret';
import { DropdownModule as MuiDropdownModule } from 'mui-angular/dropdown';
import { TextareaModule as MuiTextareaModule } from 'mui-angular/textarea';
import { InputModule as MuiInputModule } from 'mui-angular/input';

import { HomePageComponent } from './home-page';
import { AppbarPageComponent } from './appbar-page';
import { ButtonPageComponent } from './button-page';
import { DividerPageComponent } from './divider-page';
import { DropdownPageComponent } from './dropdown-page';
import { GridPageComponent} from './grid-page';
import { PanelPageComponent } from './panel-page';
import { TabsPageComponent } from './tabs-page';
import { FormPageComponent } from './form-page';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    AppbarPageComponent,
    ButtonPageComponent,
    DividerPageComponent,
    DropdownPageComponent,
    GridPageComponent,
    PanelPageComponent,
    TabsPageComponent,
    FormPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MuiAppbarModule,
    MuiButtonModule,
    MuiColModule,
    MuiContainerModule,
    MuiPanelModule,
    MuiRowModule,
    MuiDividerModule,
    MuiTabsModule,
    MuiCaretModule,
    MuiDropdownModule,
    MuiTextareaModule,
    MuiInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})


export class AppModule { }
