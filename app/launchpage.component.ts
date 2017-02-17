import {Component} from '@angular/core';
import {AppManagerService} from './appmanager.service';
import {AppItem} from './appitem';
import {LaunchPageApplistComponent} from './launchpage.applist.component';
import {SpaceifyBgndDirective} from './spaceifybgnd.directive';

declare class SpaceifyConfig
	{
	public get(c: string): any;
	public initialize(mode: string): any;
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
		{
		this.config = new SpaceifyConfig();
		this.config.initialize("");
		}

	this.appTypes = this.config.get("APP_TYPES");

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