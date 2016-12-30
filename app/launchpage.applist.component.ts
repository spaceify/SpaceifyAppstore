import {Component, Input, Output, EventEmitter, OnInit, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import {AppManagerService} from './appmanager.service';
import {AppItem} from './appitem';
import {SpaceifySourceDirective} from './spaceifysrc.directive';

@Component({
	selector: 'launchpageapplist',
	templateUrl: 'appstore/app/launchpage.applist.component.html',
	styleUrls: [ 'appstore/app/launchpage.applist.component.css' ]
})

export class LaunchPageApplistComponent
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