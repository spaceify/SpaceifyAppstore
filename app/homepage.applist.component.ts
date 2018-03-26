import {Component, Input, Output, EventEmitter, OnInit, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import {AppManagerService} from './appmanager.service';
import {AppItem} from './appitem';
import {SpaceifySourceDirective} from './spaceifysrc.directive';

@Component({
	selector: 'homepageapplist',
	templateUrl: 'appstore/app/homepage.applist.component.html',
	styleUrls: [ 'appstore/app/homepage.applist.component.css' ]
})

export class HomepageApplistComponent
{
selectedApp: AppItem;

@Input() apps: AppItem[];
@Input() selectedMode: string;

constructor(private _appservice: AppManagerService, private router : Router)
	{
	}

onSelect(app: AppItem)
	{

	}

}