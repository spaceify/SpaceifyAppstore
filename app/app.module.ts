import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }     from '@angular/http';

import { AppComponent }  from './app.component';
import { ManageComponent }  from './manage.component';
import { ManageAppComponent }  from './manageapp.component';
import { InstallComponent }  from './install.component';
import { InstallAppComponent }  from './installapp.component';
import { IntroComponent }  from './intro';
import { PageNotFoundComponent }  from './404';


//import {HTTP_PROVIDERS} from '@angular/http';

import {AppManagerService} from './appmanager.service';
import {MockService} from './appmanager.mockservice';

import { routing} from './app.routes';

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpModule, routing ],
  declarations: [ AppComponent, ManageAppComponent, InstallAppComponent, IntroComponent, PageNotFoundComponent ],
  providers: [
    //AppManagerService
    { provide: AppManagerService, useClass: MockService }
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }