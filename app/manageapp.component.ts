import {Component, Input, Output, EventEmitter, OnInit, OnDestroy} from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import {AppManagerService} from './appmanager.service';

@Component({
    selector: 'manageapp',
    templateUrl: 'app/manageapp.component.html',
})

export class ManageAppComponent implements OnInit, OnDestroy { 

    constructor(private _appservice: AppManagerService){
        
    }

    ngOnInit() {
		
		//get selected app by unique_name from service

		//this._appservice.getContacts(this.route.snapshot.params.id).subscribe(contact => this.contact = contact);


	}

	ngOnDestroy() {
		
	}



}

