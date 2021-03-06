import {Component} from '@angular/core';
import {AppManagerService} from './appmanager.service';
import {AppItem} from './appitem';
import { AppFilterPipe } from './app.pipe';
import {ApplistComponent} from './applist.component';
import {SpaceifyBgndDirective} from './spaceifybgnd.directive';

@Component({
	selector: 'install',
	templateUrl: 'appstore/app/install.component.html',
	styleUrls: [ 'appstore/app/install.component.css' ],
	//directives: [ApplistComponent]
})

export class InstallComponent
{
apps: AppItem[];
selectedMode:string = "install";

constructor(private _appservice: AppManagerService)
	{
	}

doSearch(str : string)
	{
	this._appservice.searchAppStore(str);
	}

getAppsStoreApps()
	{
	this.apps = this._appservice.getAppsStoreApps();
	}

getInstalledApps()
	{
	this.apps = this._appservice.getInstalledApps();
	this._appservice.updateInstalledApplicationsList();
	}

ngOnInit()
	{
	console.log("install.component: ngOnInit");

	this.getAppsStoreApps();
	this._appservice.updateInstalledApplicationsList();
	this._appservice.searchAppStore();
	this.getAppsStoreApps();
	}

ngOnDestroy()
	{
	console.log("install.component: ngOnDestroy");
	}

}