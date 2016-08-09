import {Component, Input, Output, EventEmitter, OnInit, OnDestroy} from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import {AppManagerService} from './appmanager.service';

@Component({
    selector: 'installapp',
    templateUrl: 'app/installapp.component.html',
})

export class InstallAppComponent implements OnInit, OnDestroy { 

    constructor(private _appservice: AppManagerService){
        
    }

    ngOnInit() {
		//console.log("ngOnInit");
		//this.getAppsStoreApps();
		//this._appservice.updateInstalledApplicationsList();
		//this._appservice.searchAppStore();

	}

	ngOnDestroy() {
		
	}



}

