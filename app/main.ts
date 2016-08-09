

import {bootstrap}    from '@angular/platform-browser-dynamic';
import {AppComponent} from './app.component';
import {HTTP_PROVIDERS} from '@angular/http';
import {AppManagerService} from './appmanager.service';

import {MockService} from './appmanager.mockservice';

import { appRouterProviders } from './app.routes';




bootstrap(AppComponent, [appRouterProviders, { provide: AppManagerService, useClass: MockService }, HTTP_PROVIDERS]);
//bootstrap(AppComponent, [appRouterProviders, AppManagerService, HTTP_PROVIDERS]);
    


