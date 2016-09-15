import {Component, Input, Output, EventEmitter, OnInit, OnDestroy} from '@angular/core';
//import { ROUTER_DIRECTIVES } from '@angular/router';

import { ActivatedRoute } from '@angular/router';

import {AppManagerService} from './appmanager.service';
import {AppItem} from './appitem';

@Component({
    selector: 'manageapp',
    templateUrl: 'app/manageapp.component.html',
	styleUrls: [ 'app/app.component.css' ],
})

export class ManageAppComponent implements OnInit, OnDestroy { 

    selectedApp: AppItem;
  	sub: any;


    constructor(private _appservice: AppManagerService, private route: ActivatedRoute){
        
    }

    ngOnInit() {
		//console.log("ngOnInit");
		//this.getAppsStoreApps();
		//this._appservice.updateInstalledApplicationsList();
		//this._appservice.searchAppStore();

		this.sub = this.route.params.subscribe(params => {
			let un = decodeURIComponent(params['unique_name']);
			this.selectedApp = this._appservice.getInstalledApp(un);

		});
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}



}

