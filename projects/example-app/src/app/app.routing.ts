import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { AppbarPageComponent } from './appbar-page';
import { ButtonPageComponent } from './button-page';
import { GridPageComponent } from './grid-page';
import { DividerPageComponent } from './divider-page';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'appbar', component: AppbarPageComponent },
  { path: 'button', component: ButtonPageComponent },
  { path: 'grid', component: GridPageComponent },
  { path: 'divider', component: DividerPageComponent },
  
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const AppRoutingModule = RouterModule.forRoot(routes);
