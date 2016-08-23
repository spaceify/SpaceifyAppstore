import {Component} from '@angular/core';
import {AppManagerService} from './appmanager.service';
import {AppItem} from './appitem';
import { AppFilterPipe } from './app.pipe';
import {ApplistComponent} from './applist.component';

@Component({
    selector: 'manage',
    templateUrl: 'app/manage.component.html',
    styleUrls: [ 'app/manage.component.css' ],
  	directives: [ApplistComponent]
})

export class ManageComponent{ 
	apps: AppItem[];
	selectedMode:string = "manage";

	constructor(private _appservice: AppManagerService) { 
	}

	getAppsStoreApps() {
		
		this.apps = this._appservice.getAppsStoreApps();

	}

	getInstalledApps() {
		
		this.apps = this._appservice.getInstalledApps();
		this._appservice.updateInstalledApplicationsList();
	}

	ngOnInit() {
		console.log("manage.component: ngOnInit");
		this.getAppsStoreApps();
		this._appservice.updateInstalledApplicationsList();
		this._appservice.searchAppStore();
		this.getInstalledApps();
	}

	ngOnDestroy() {
		console.log("manage.component: ngOnDestroy");
		
	}
	
}