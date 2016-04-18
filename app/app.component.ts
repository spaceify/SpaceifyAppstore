import {Component, OnInit} from 'angular2/core';
import {HTTP_PROVIDERS } from 'angular2/http';
import {AppService} from './app.service';
import {AppItem} from './appitem';
import { AppFilterPipe } from './app.pipe';





@Component({
    selector: 'my-app',
    pipes: [AppFilterPipe],
    templateUrl: 'app/app.component.html',
    providers: [HTTP_PROVIDERS, AppService]
})

export class AppComponent implements OnInit { 

	apps: AppItem[];
	selectedApp: AppItem;
	selectedMode:string = "Install";
	query:string = "";

	public apps_error: Boolean = false;

	constructor(private _appservice: AppService) { 

		this._appservice.getManifests().subscribe(
			data => {
				this.apps = data;
				console.log(data);
			},
			err => { this.apps_error = true }
		);

	}


	getApps() {
		//this._appservice.getApps().then(apps => { this.apps = apps; this.selectedApp = apps[0]; });

		//this._appservice.getManifests().then(apps => { this.apps = apps; this.selectedApp = apps[0]; });

		//this.apps = this._appservice.getManifests();

		/*
		this._appservice.getManifests().subscribe(
			data => {
			this.apps = data;
				console.log(data);
			},
			err => { this.apps_error = true }
		);

		*/


	}

	getInstalledApps() {
		//this._appservice.getInstalledApps().then(apps => { this.apps = apps; this.selectedApp = apps[0]; });

		//this.apps = this._appservice.getManifests();
	}

	ngOnInit() {
		this.getApps();
		//this.selectedMode = "Install";
		//this.selectedApp = this.apps[0];
	}

	onSelect(app: AppItem) { this.selectedApp = app; }

	setMode(mode: string) {
		this.selectedMode = mode;

		if (mode == "Install")
			this.getApps();
		else
			this.getInstalledApps();
	
	}

}
