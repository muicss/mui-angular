import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppbarModule as MuiAppbarModule } from '@muicss/angular/appbar';
import { ButtonModule as MuiButtonModule } from '@muicss/angular/button';
import { ColModule as MuiColModule } from '@muicss/angular/col';
import { ContainerModule as MuiContainerModule } from '@muicss/angular/container';
import { PanelModule as MuiPanelModule } from '@muicss/angular/panel';
import { RowModule as MuiRowModule } from '@muicss/angular/row';
import { DividerModule as MuiDividerModule } from '@muicss/angular/divider';
import { TabsModule as MuiTabsModule } from '@muicss/angular/tabs';
import { CaretModule as MuiCaretModule } from '@muicss/angular/caret';
import { DropdownModule as MuiDropdownModule } from '@muicss/angular/dropdown';
import { TextareaModule as MuiTextareaModule } from '@muicss/angular/textarea';
import { InputModule as MuiInputModule } from '@muicss/angular/input';
import { RadioModule as MuiRadioModule } from '@muicss/angular/radio';
import { CheckboxModule as MuiCheckboxModule } from '@muicss/angular/checkbox';
import { SelectModule as MuiSelectModule } from '@muicss/angular/select';

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
    MuiInputModule,
    MuiCheckboxModule,
    MuiRadioModule,
    MuiSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})


export class AppModule { }
