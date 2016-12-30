import {Component} from '@angular/core';
import {AppManagerService} from './appmanager.service';
import {AppItem} from './appitem';
import {LaunchPageApplistComponent} from './launchpage.applist.component';
import {SpaceifyBgndDirective} from './spaceifybgnd.directive';

declare class SpaceifyConfig
	{
	public get(c: string): any;
	}

@Component({
	selector: 'launchpage',
	templateUrl: 'appstore/app/launchpage.component.html',
	styleUrls: [ 'appstore/app/launchpage.component.css' ],
	//directives: [LaunchPageApplistComponent]
})

export class LaunchPageComponent
{
apps: Object = {};
appsAll: AppItem[] = [];

appTypes: any[] = [];

private config: SpaceifyConfig;

constructor(private _appservice: AppManagerService)
	{
	if(typeof(SpaceifyConfig) === "function")
		this.config = new SpaceifyConfig();

	this.appTypes = this.config.get("APP_TYPES");
console.log("----------------------------", this.appTypes);
	for(var i = 0; i < this.appTypes.length; i++)
		this.apps[this.appTypes[i]] = [];
	}

doSearch(str : string)
	{
	this.getInstalledApps();
	}

getInstalledApps()
	{
	this.appsAll = this._appservice.getInstalledApps();

	for(var i = 0; i < this.appTypes.length; i++)								// Empty application type arrays and fill with new applications
		this.apps[this.appTypes[i]] = [];

	while(this.appsAll.length > 0)
		{ // ToDo: filtering by category etc.?
		var app = this.appsAll.shift();
		this.apps[app.type].push(app);
		}
console.log("--------------", this.apps);
	this._appservice.updateInstalledApplicationsList();
	}

ngOnInit()
	{
	console.log("appstore.component: ngOnInit");

	this._appservice.updateInstalledApplicationsList();
	this.getInstalledApps();
	}

ngOnDestroy()
	{
	console.log("launchpage.component: ngOnDestroy");
	}

}