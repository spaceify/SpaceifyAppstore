import {Component, Input, Output, EventEmitter, OnInit, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import {AppManagerService} from './appmanager.service';
//import {ServerMessageType} from './spaceifyhandler';
import {AppItem} from './appitem';
//import {SpaceifySourceDirective} from './spaceifysrc.directive';


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
  @Input() selectedMode: string;
  
  constructor(private _appservice: AppManagerService, private router : Router) { 

  }


  getSelectedApp() : AppItem {
     return this.selectedApp;
      
  }

  onSelect(app: AppItem) {
    this.selectedApp = app;
    this._appservice.clearLogMessages();

    this._appservice.checkAppChanges(app);

    //console.log(this.selectedMode);
    //var parsedName =  app.unique_name.replace("/", "_");
    var encodedUnique_name = encodeURIComponent(app.unique_name);
    this.router.navigate(['/'+this.selectedMode, encodedUnique_name]);
    //lue path ja lisää unique_name
    
    //this.selected.next({ value: app });

  }



}