import { Routes, RouterModule } from '@angular/router';

import { ManageAppComponent } from './manageapp.component';
import { InstallAppComponent } from './installapp.component';
import { IntroComponent } from './intro';
import { AppNotFoundComponent } from './404';


const routes: Routes = [
  {
    path: 'manage/:unique_name',
    component: ManageAppComponent
  },
  {
    path: 'install/:unique_name',
    component: InstallAppComponent
  },
  {
    path: 'intro',
    component: IntroComponent
  },
  {
    path: '',
    redirectTo: '/intro',
    pathMatch: 'full'
  },
  { path: '**', component: AppNotFoundComponent },
];

export const routing = RouterModule.forRoot(routes);