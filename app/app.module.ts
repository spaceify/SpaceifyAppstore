import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }     from '@angular/http';

import { AppComponent }  from './app.component';
import { LaunchPageApplistComponent }  from './launchpage.applist.component';
import { ApplistComponent }  from './applist.component';
import { AppItemComponent }  from './appitem.component';

import {ContextbarComponent} from './contextbar.component'

import { LaunchPageComponent }  from './launchpage.component';
import { ManageComponent }  from './manage.component';
import { ManageAppComponent }  from './manageapp.component';
import { InstallComponent }  from './install.component';
import { InstallAppComponent }  from './installapp.component';
import { IntroComponent }  from './intro';
import { PageNotFoundComponent }  from './404';

import {SpaceifySourceDirective} from './spaceifysrc.directive';
import {SpaceifyBgndDirective} from './spaceifybgnd.directive';

import { MdIconModule } from '@angular2-material/icon';
import { MdButtonModule } from '@angular2-material/button';

//import {HTTP_PROVIDERS} from '@angular/http';

import { AppManagerService } from './appmanager.service';
import { MockService } from './appmanager.mockservice';

import { routing } from './app.routes';

//import{ WindowRef } from './windowref';

@NgModule({
	imports:
		[
			BrowserModule,
			FormsModule,
			HttpModule,
			routing
			// ,MdIconModule,
			// MdButtonModule
		],
	declarations:
		[
			AppComponent,
			LaunchPageApplistComponent,
			ApplistComponent,
			AppItemComponent,
			ContextbarComponent,
			LaunchPageComponent,
			ManageComponent,
			ManageAppComponent,
			InstallComponent,
			InstallAppComponent,
			IntroComponent,
			PageNotFoundComponent,
			SpaceifySourceDirective,
			SpaceifyBgndDirective
		],
 	providers:
 		[
			{ provide: AppManagerService, useClass: AppManagerService },			// MockService
			//{ provide: "WindowRef", useValue: window}
 		],
	bootstrap:
		[
		AppComponent
		]
	})

export class AppModule { }