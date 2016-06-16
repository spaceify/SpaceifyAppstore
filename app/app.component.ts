import {Component, OnInit, OnDestroy, NgZone} from '@angular/core';
import {HTTP_PROVIDERS } from '@angular/http';
import {AppService, ServerMessageType} from './app.service';
import {AppItem} from './appitem';
import { AppFilterPipe } from './app.pipe';

@Component({
    selector: 'my-app',
    pipes: [AppFilterPipe],
    templateUrl: 'app/app.component.html',
    providers: [HTTP_PROVIDERS, AppService]
})

export class AppComponent implements OnInit, OnDestroy { 

	apps: AppItem[];
	selectedApp: AppItem;
	selectedMode:string = "Install";
	query:string = "";

	//public apps_error: Boolean = false;

	//servermessages: string[];

	//ngzone not needed
	constructor(private _appservice: AppService, private _ngZone: NgZone) { 

		
	}

	getServerMessageColor(type : ServerMessageType){
		//if(type == Ser)
		//ServerMessage.
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
			this._appservice.commandApp(command, selectedApp.uniquename);
	}



	ngOnInit() {
		
	}

	ngOnDestroy() {
		//window.angularComponent = null;
	}



	onSelect(app: AppItem) { 
		this.selectedApp = app; 
		this._appservice.clearLogMessages();
	}

	setMode(mode: string) {
		this.selectedMode = mode;

		if (mode == "Install")
			this.getAppsStoreApps();
		else
			this.getInstalledApps();
	
	}

}
