import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './home-page';
import { AppbarPageComponent } from './appbar-page';
import { ButtonPageComponent } from './button-page';
import { DividerPageComponent } from './divider-page';
import { DropdownPageComponent } from './dropdown-page';
import { GridPageComponent } from './grid-page';
import { PanelPageComponent } from './panel-page';
import { TabsPageComponent } from './tabs-page';
import { FormPageComponent } from './form-page';


const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'appbar', component: AppbarPageComponent },
  { path: 'button', component: ButtonPageComponent },
  { path: 'divider', component: DividerPageComponent },
  { path: 'dropdown', component: DropdownPageComponent },
  { path: 'grid', component: GridPageComponent },
  { path: 'panel', component: PanelPageComponent },
  { path: 'tabs', component: TabsPageComponent },
  { path: 'form', component: FormPageComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const AppRoutingModule = RouterModule.forRoot(routes);
