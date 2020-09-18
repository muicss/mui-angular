import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './home-page';
import { AppbarPageComponent } from './appbar-page';
import { ButtonPageComponent } from './button-page';
import { GridPageComponent } from './grid-page';
import { DividerPageComponent } from './divider-page';
import { PanelPageComponent } from './panel-page';
import { TabsPageComponent } from './tabs-page';
import { DropdownPageComponent } from './dropdown-page';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'appbar', component: AppbarPageComponent },
  { path: 'button', component: ButtonPageComponent },
  { path: 'grid', component: GridPageComponent },
  { path: 'divider', component: DividerPageComponent },
  { path: 'panel', component: PanelPageComponent },
  { path: 'tabs', component: TabsPageComponent },
  { path: 'dropdown', component: DropdownPageComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const AppRoutingModule = RouterModule.forRoot(routes);
