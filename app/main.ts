

import {bootstrap}    from '@angular/platform-browser-dynamic';
import {AppComponent} from './app.component';
import {HTTP_PROVIDERS} from '@angular/http';
import {AppManagerService} from './appmanager.service';

import {MockService} from './appmanager.mockservice';

declare var OFFLINE : boolean;

if(OFFLINE)
    bootstrap(AppComponent, [{ provide: AppManagerService, useClass: MockService }, HTTP_PROVIDERS]);
else
    bootstrap(AppComponent, [AppManagerService, HTTP_PROVIDERS]);
    


