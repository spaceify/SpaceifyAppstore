import {Component, OnInit, OnDestroy, NgZone} from '@angular/core';
import {HTTP_PROVIDERS } from '@angular/http';
import {AppService} from './app.service';
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

	public apps_error: Boolean = false;

	//appService: AppService;

	

	//ngzone not needed
	constructor(private _appservice: AppService, private _ngZone: NgZone) { 

		/*
		this._appservice.getManifests().subscribe(
			data => {
				this.apps = data;
				console.log(data);
			},
			err => { this.apps_error = true }
		);

		*/

		//this.appService = _appservice;

		//window.angularComponentRef = { component: this, zone: _ngZone };

	}


	getAppsStoreApps() {
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

		this.apps = this._appservice.getAppsStoreApps();


	}

	getInstalledApps() {
		//this._appservice.getInstalledApps().then(apps => { this.apps = apps; this.selectedApp = apps[0]; });

		//this.apps = this._appservice.getManifests();
		this.apps = this._appservice.getInstalledApps();
	}

	installApp(selectedApp){

		console.log(selectedApp);

		this._appservice.installApp(selectedApp.uniquename);
	}

	uninstallApp(selectedApp) {
		console.log(selectedApp);

		this._appservice.uninstallApp(selectedApp.uniquename);
	}

	ngOnInit() {
		//this.getApps();

		//this.getAppsStoreApps()
		

		//this.selectedMode = "Install";
		//this.selectedApp = this.apps[0];

		//DOM.dispatchEvent(elementRef.nativeElement, new CustomEvent('angular-ready'));
	}

	ngOnDestroy() {
		//window.angularComponent = null;
	}



	onSelect(app: AppItem) { this.selectedApp = app; }

	setMode(mode: string) {
		this.selectedMode = mode;

		if (mode == "Install")
			this.getAppsStoreApps();
		else
			this.getInstalledApps();
	
	}

}
