import {Component} from '@angular/core';
import {AppManagerService} from './appmanager.service';
import {AppItem} from './appitem';
import { AppFilterPipe } from './app.pipe';
import {ApplistComponent} from './applist.component';

@Component({
    selector: 'manage',
    templateUrl: 'app/manage.component.html',
    styleUrls: [ 'app/manage.component.css' ],
  	//directives: [ApplistComponent]
})

export class ManageComponent{
	appsAll: AppItem[] = [];
	apps: AppItem[] = [];
	selectedMode:string = "manage";
	searchString:string = "";

	constructor(private _appservice: AppManagerService) { 
	}

	doSearch(str : string) {
		this.searchString = str;
		this.getInstalledApps();
	}


	getAppsStoreApps() {
		
		this.apps = this._appservice.getAppsStoreApps();

	}

	getInstalledApps() {
		this.appsAll = this._appservice.getInstalledApps();
		if (this.searchString == "") {
			this.apps = this.appsAll;
		}
		else {
			this.apps = this.appsAll.filter(app => app.name.toLowerCase().indexOf(this.searchString.toLowerCase()) != -1);
				//app.name.indexOf(this.searchString) >= 0);
		}
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