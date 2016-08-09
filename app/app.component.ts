import {Component, OnInit, OnDestroy} from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import {Control} from "@angular/common";
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Router } from '@angular/router';

import {AppManagerService} from './appmanager.service';
import {ServerMessageType} from './spaceifyhandler';


import {ApplistComponent} from './applist.component';

import {AppItem} from './appitem';
import { AppFilterPipe } from './app.pipe';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';


@Component({
    selector: 'my-app',
    pipes: [AppFilterPipe],
    templateUrl: 'app/app.component.html',
    styleUrls: [ 'app/app.component.css' ],
  	directives: [ApplistComponent, ROUTER_DIRECTIVES]
})

export class AppComponent implements OnInit, OnDestroy { 

	apps: AppItem[];
	selectedMode:string = "Install";
	query = new Control();

	@ViewChild(ApplistComponent)
	private applistComponent: ApplistComponent;

	constructor(private _appservice: AppManagerService, private router : Router) { 
		this.query.valueChanges
			.debounceTime(400)
			.distinctUntilChanged()
			.subscribe(
				(value: string) => {
					console.log('changed to:', value);
					_appservice.searchAppStore(value);
				}
			);

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
		this._appservice.updateInstalledApplicationsList();
		this._appservice.searchAppStore();

	}

	ngOnDestroy() {
		
	}

	get selectedApp() : AppItem{
		if (this.applistComponent)
			return this.applistComponent.getSelectedApp();
	}

	setMode(mode: string) {
		this.selectedMode = mode;

		if (mode == "Install"){
			this.getAppsStoreApps();

			//this.router.navigate(link);
			this.router.navigate(['/install']);
		}
		else{
			this.getInstalledApps();
			this.router.navigate(['/manage']);

		}
	
	}

}
