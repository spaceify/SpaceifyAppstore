import { provideRouter, RouterConfig }  from '@angular/router';
//import { AppComponent } from './app.component';
import { ManageAppComponent } from './manageapp.component';
import { InstallAppComponent } from './installapp.component';

const routes: RouterConfig = [
  {
    path: 'manage',
    component: ManageAppComponent
  },
  {
    path: 'install',
    component: InstallAppComponent
  },  
  {
    path: '',
    redirectTo: '/install',
    pathMatch: 'full'
  },
];

export const appRouterProviders = [
  provideRouter(routes)
];