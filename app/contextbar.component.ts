import {Component, Input, Output, EventEmitter} from '@angular/core';


@Component({
    selector: 'contextbar',
    //pipes: [AppFilterPipe],
    //templateUrl: 'app/app.component.html',
    //styleUrls: [ 'app/app.component.css' ],
  	//directives: [ROUTER_DIRECTIVES]
    template: 
    `<nav class="menu_container">
		<a class="menu_topic" routerLink="/install" routerLinkActive="navActive">STORE</a>
		<a class="menu_topic" routerLink="/manage" routerLinkActive="navActive">INSTALLED APPLICATIONS</a>

		
		<div *ngIf='searchEnabled' id="search_bar" class="search_bar">
			<input type="search" id="search" placeholder="Search" #search (keyup.enter)="doSearch(search.value)">
		</div>

		
		<br class="menu_clear" />
	</nav>`,
})

export class ContextbarComponent { 

    @Input() searchEnabled : boolean = false;
    @Output() searchEvent = new EventEmitter();

    doSearch(searchString : string){
        this.searchEvent.emit({
        value: searchString
        })
    }

    constructor() {}



}