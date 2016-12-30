import {Component, Input, Output, EventEmitter} from '@angular/core';

declare class SpaceifyNet
	{
	public loadLaunchPage(): void;
	}

@Component({
	selector: 'contextbar',
	//pipes: [AppFilterPipe],
	//templateUrl: 'appstore/app/app.component.html',
	//styleUrls: [ 'appstore/app/app.component.css' ],
	//directives: [ROUTER_DIRECTIVES]
	template:
		`<nav class="menu_container">
		<!--<a class="menu_topic" routerLink="/launchpage" routerLinkActive="navActive">LAUNCH PAGE</a>-->
		<a class="menu_topic" (click)="loadLaunchPage()" style="cursor: pointer;">LAUNCH PAGE</a>
		<a class="menu_topic" routerLink="/install" routerLinkActive="navActive">STORE</a>
		<a class="menu_topic" routerLink="/manage" routerLinkActive="navActive">INSTALLED APPLICATIONS</a>

		<div *ngIf='searchEnabled' id="search_bar" class="search_bar">
			<input type="search" id="search" placeholder="Search" #search (keyup.enter)="doSearch(search.value)">
		</div>

		<br class="menu_clear" />
		</nav>`,
	})

export class ContextbarComponent
{
@Input() searchEnabled : boolean = false;
@Output() searchEvent = new EventEmitter();

private net: SpaceifyNet;

constructor()
	{
	if(typeof(SpaceifyNet) === "function")
		this.net = new SpaceifyNet();
	}

doSearch(searchString : string)
	{
	this.searchEvent.emit({
		value: searchString
		})
	}

loadLaunchPage()
	{
	this.net.loadLaunchPage();
	}

}