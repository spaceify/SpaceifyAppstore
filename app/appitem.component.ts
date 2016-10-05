import {Component, Input, Output, EventEmitter, OnInit, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import {AppManagerService} from './appmanager.service';
import {AppItem} from './appitem';


@Component({
    selector: 'appitem',
    templateUrl: 'app/appitem.component.html',
    styleUrls: [ 'app/appitem.component.css' ]
})

export class AppItemComponent { 
  @Input() app: AppItem;

  constructor(private _appservice: AppManagerService, private router : Router) { 
  }

  getApp() : AppItem {
    return this.app;     
  }

  onSelect(app: AppItem) {
    this.app = app;
  }
}
