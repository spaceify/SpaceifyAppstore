import {Component, OnInit, OnDestroy} from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import {Control} from "@angular/common";


//import {HTTP_PROVIDERS } from '@angular/http';


import {AppManagerService, MockService, ServerMessageType} from './appmanager.service';

import {ApplistComponent} from './applist.component';

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
    //providers: [{provide : AppManagerService, useClass: MockService }],
    //providers: [AppManagerService],
    styleUrls: [ 'app/app.component.css' ],
  	directives: [ApplistComponent]
})

export class AppComponent implements OnInit, OnDestroy { 

	apps: AppItem[];
	//selectedApp: AppItem;
	selectedMode:string = "Install";
	query = new Control();

	@ViewChild(ApplistComponent)
	private applistComponent: ApplistComponent;

	//term = new Control();

	
	constructor(private _appservice: AppManagerService) { 
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
		this._appservice.updateInstalledApplicationsList();
	}

	commandApp(selectedApp, command) {
		if (selectedApp)
			this._appservice.commandApp(command, selectedApp);
	}



	ngOnInit() {
		//console.log("ngOnInit");
		this.getAppsStoreApps();
	}

	ngOnDestroy() {
		
	}

	get selectedApp() : AppItem{
		if (this.applistComponent)
			return this.applistComponent.getSelectedApp();
	}

	
	/*
	onSelect(app: AppItem) { 

		//console.log(app);
		this.selectedApp = app; 
		this._appservice.clearLogMessages();


		if (this.selectedMode != "Install"){
			this._appservice.isAppRunning(app.unique_name);
		}
	}

	*/
	

	setMode(mode: string) {
		this.selectedMode = mode;

		if (mode == "Install")
			this.getAppsStoreApps();
		else
			this.getInstalledApps();
	
	}

}
