import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }     from '@angular/http';

import { AppComponent }  from './app.component';
import { ApplistComponent }  from './applist.component';

import { ManageComponent }  from './manage.component';
import { ManageAppComponent }  from './manageapp.component';
import { InstallComponent }  from './install.component';
import { InstallAppComponent }  from './installapp.component';
import { IntroComponent }  from './intro';
import { PageNotFoundComponent }  from './404';

import {SpaceifySourceDirective} from './spaceifysrc.directive';

import { MdIconModule } from '@angular2-material/icon';
import { MdButtonModule } from '@angular2-material/button';

//import {HTTP_PROVIDERS} from '@angular/http';

import {AppManagerService} from './appmanager.service';
import {MockService} from './appmanager.mockservice';

import { routing} from './app.routes';

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpModule, routing],  // ,MdIconModule, MdButtonModule ],
  declarations: [ AppComponent,
                  ApplistComponent, 
                  ManageComponent,
                  ManageAppComponent, 
                  InstallComponent,
                  InstallAppComponent, 
                  IntroComponent, 
                  PageNotFoundComponent,
                  SpaceifySourceDirective ],
  providers: [
    //AppManagerService
    { provide: AppManagerService, useClass: MockService }
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }