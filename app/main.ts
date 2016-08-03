

import {bootstrap}    from '@angular/platform-browser-dynamic';
import {AppComponent} from './app.component';
import {HTTP_PROVIDERS} from '@angular/http';
import {AppManagerService, MockService, ServerMessageType} from './appmanager.service';

//bootstrap(AppComponent, [{ provide: AppManagerService, useClass: MockService }, HTTP_PROVIDERS]);
bootstrap(AppComponent, [AppManagerService, HTTP_PROVIDERS]);
