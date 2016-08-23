import {Component,Input} from '@angular/core';
import {AppManagerService} from './appmanager.service';

@Component({
    selector: 'searchbar',
    templateUrl: 'app/searchbar.component.html',
    styleUrls: [ 'app/searchbar.component.css' ]
})

export class SearchBarComponent{
	@Input() selectedMode: string = 'install'; // "install" or "manage"

	constructor(private _appservice: AppManagerService) { 
	}

	doSearch(str : string) {
		if (this.selectedMode == "install") {
			this._appservice.searchAppStore(str);
		}
		else {
			//this._appservice.searchAppStore(str);
		}
	}

	ngOnInit() {
		console.log("searchbar.component: ngOnInit");
	}

	ngOnDestroy() {
		console.log("searchbar.component: ngOnDestroy");
	}
	
}