import {Component, OnInit, OnDestroy} from '@angular/core';

//import {Control} from "@angular/common";
//import { ROUTER_DIRECTIVES } from '@angular/router';

import {AppManagerService} from './appmanager.service';
import {ServerMessageType} from './spaceifyhandler';

import {AppItem} from './appitem';
import { AppFilterPipe } from './app.pipe';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

declare class SpaceifyNet
	{
	public loadHomepage(): void;
	public adminLogOut(): void;
	public showMenu(): void;
	public showPopup(id: string, status: boolean): void;
	}

@Component({
	selector: 'my-app',
	//pipes: [AppFilterPipe],
	templateUrl: 'appstore/app/app.component.html',
	styleUrls: [ 'appstore/app/app.component.css' ],
	//directives: [ROUTER_DIRECTIVES]
})

export class AppComponent implements OnInit, OnDestroy
{
apps: AppItem[];
selectedMode:string = "install";
//query = new Control();

/*
@ViewChild(ApplistComponent)
private applistComponent: ApplistComponent;
*/

private net: SpaceifyNet;

constructor(private _appservice: AppManagerService)
	{
	/*
	this.query.valueChanges
		.debounceTime(400)
		.distinctUntilChanged()
		.subscribe(
			(value: string) => {
				console.log('changed to:', value);
				_appservice.searchAppStore(value);
			}
		);
	*/

	if(typeof(SpaceifyNet) === "function")
		this.net = new SpaceifyNet();
	}

/*
getServerMessageStyle(type : ServerMessageType)
	{
	if (type == ServerMessageType.Message)
		return "serverMessageMessage";
	else if (type == ServerMessageType.Error)
		return "serverMessageError";
	else if(type == ServerMessageType.Warning)
		return "serverMessageWarning";
	else if (type == ServerMessageType.Notify)
		return "serverMessageNotify";
	}
*/

getAppsStoreApps()
	{
	this.apps = this._appservice.getAppsStoreApps();
	}

getInstalledApps()
	{
	this.apps = this._appservice.getInstalledApps();
	this._appservice.updateInstalledApplicationsList();
	}

/*
commandApp(selectedApp, command)
	{
	if (selectedApp)
		this._appservice.commandApp(command, selectedApp);
	}
*/

ngOnInit()
	{
	//console.log("ngOnInit");
	this.getAppsStoreApps();

	/*
	this._appservice.updateInstalledApplicationsList();
	this._appservice.searchAppStore();
	*/
	}

ngOnDestroy()
	{
	}

/*
get selectedApp() : AppItem
	{
	if (this.applistComponent)
		return this.applistComponent.getSelectedApp();
	}
*/

setMode(mode: string)
	{
	this.selectedMode = mode;

	//this.router.navigate(['/'+mode]);

	if (mode == "install")
		{
		this.getAppsStoreApps();

		//this.router.navigate(link);
		}
	else{
		this.getInstalledApps();
		//this.router.navigate(['/manage']);
		}
	}

loadHomepage()
	{
	this.net.loadHomepage();
	}

adminLogOut()
	{
	this.net.adminLogOut();
	}

showMenu()
	{
	this.net.showMenu();
	}

showPopup(id: string, status: boolean)
	{
console.log(id, status);
	this.net.showPopup(id, status);
	}

}
