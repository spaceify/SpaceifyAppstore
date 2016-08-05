import {Component, Input, Output, EventEmitter, OnInit, OnDestroy} from '@angular/core';
import {AppManagerService} from './appmanager.service';
//import {ServerMessageType} from './spaceifyhandler';
import {AppItem} from './appitem';

@Component({
    selector: 'applist',
    templateUrl: 'app/applist.component.html',
    styles: [`
  		.selected {
    		background-color: #CFD8DC !important;
    		color: white;
  		}

      li.selected:hover {
      background-color: #BBD8DC !important;
      color: white;
      }

      li:hover {
        color: #607D8B;
        background-color: #DDD;
        left: .1em;
      }

  
  	`]
})

export class ApplistComponent { 



  selectedApp: AppItem;

  @Input() apps: AppItem[];

 
  constructor(private _appservice: AppManagerService) { 

  }


  getSelectedApp() : AppItem {
     return this.selectedApp;
      
  }

  onSelect(app: AppItem) {
    this.selectedApp = app;
    this._appservice.clearLogMessages();

    this._appservice.checkAppChanges(app);
    
    //this.selected.next({ value: app });

  }



}