import {Component, OnInit, OnDestroy} from '@angular/core';
import {Control} from "@angular/common";
//import {HTTP_PROVIDERS } from '@angular/http';
import {AppService, ServerMessageType} from './app.service';
import {AppItem} from './appitem';
import { AppFilterPipe } from './app.pipe';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

//depracated
//import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';

@Component({
    selector: 'my-app',
    pipes: [AppFilterPipe],
    templateUrl: 'app/app.component.html',
    providers: [AppService],
    styles: [`
  		.selected {
    		background-color: #CFD8DC !important;
    		color: white;
  		}
  	`]
})

export class AppComponent implements OnInit, OnDestroy { 

	apps: AppItem[];
	selectedApp: AppItem;
	selectedMode:string = "Install";
	query = new Control();

	//term = new Control();

	
	constructor(private _appservice: AppService) { 
		this.query.valueChanges
			.debounceTime(400)
			.distinctUntilChanged()
			.subscribe(
				(value: string) => {
				console.log('changed to:', value);
					_appservice.searchAppStore(value);
				}
			);

			
			//.switchMap(term => this.wikipediaService.search(term));
	}

	getServerMessageColor(type : ServerMessageType){
		
		if (type == ServerMessageType.Error)
			return "red";
		else if(type == ServerMessageType.Warning)
			return "yellow";
		else if (type == ServerMessageType.Notification)
			return "blue";


	}


	getAppsStoreApps() {
		
		this.apps = this._appservice.getAppsStoreApps();

	}

	getInstalledApps() {
		
		this.apps = this._appservice.getInstalledApps();
	}

	commandApp(selectedApp, command) {
		if (selectedApp)
			this._appservice.commandApp(command, selectedApp.unique_name);
	}



	ngOnInit() {
		//console.log("ngOnInit");
		this.getAppsStoreApps();
	}

	ngOnDestroy() {
		
	}

	onSelect(app: AppItem) { 
		this.selectedApp = app; 
		this._appservice.clearLogMessages();

		if (this.selectedMode != "Install"){
			this._appservice.isAppRunning(app.unique_name);
		}
	}

	setMode(mode: string) {
		this.selectedMode = mode;

		if (mode == "Install")
			this.getAppsStoreApps();
		else
			this.getInstalledApps();
	
	}

}
