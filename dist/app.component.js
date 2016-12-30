"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
//import {Control} from "@angular/common";
//import { ROUTER_DIRECTIVES } from '@angular/router';
var appmanager_service_1 = require("./appmanager.service");
require("rxjs/add/operator/map");
require("rxjs/add/operator/debounceTime");
require("rxjs/add/operator/distinctUntilChanged");
require("rxjs/add/operator/switchMap");
var AppComponent = (function () {
    function AppComponent(_appservice) {
        /*
        this.query.valueChanges
            .debounceTime(400)
            .distinctUntilChanged()
            .subscribe(
                (value: string) => {
                    console.log('changed to:', value);
                    _appservice.searchAppStore(value);
                }
            );
        */
        this._appservice = _appservice;
        this.selectedMode = "install";
        if (typeof (SpaceifyNet) === "function")
            this.net = new SpaceifyNet();
    }
    /*
    getServerMessageStyle(type : ServerMessageType)
        {
        if (type == ServerMessageType.Message)
            return "serverMessageMessage";
        else if (type == ServerMessageType.Error)
            return "serverMessageError";
        else if(type == ServerMessageType.Warning)
            return "serverMessageWarning";
        else if (type == ServerMessageType.Notification)
            return "serverMessageNotification";
        }
    */
    AppComponent.prototype.getAppsStoreApps = function () {
        this.apps = this._appservice.getAppsStoreApps();
    };
    AppComponent.prototype.getInstalledApps = function () {
        this.apps = this._appservice.getInstalledApps();
        this._appservice.updateInstalledApplicationsList();
    };
    /*
    commandApp(selectedApp, command)
        {
        if (selectedApp)
            this._appservice.commandApp(command, selectedApp);
        }
    */
    AppComponent.prototype.ngOnInit = function () {
        //console.log("ngOnInit");
        this.getAppsStoreApps();
        /*
        this._appservice.updateInstalledApplicationsList();
        this._appservice.searchAppStore();
        */
    };
    AppComponent.prototype.ngOnDestroy = function () {
    };
    /*
    get selectedApp() : AppItem
        {
        if (this.applistComponent)
            return this.applistComponent.getSelectedApp();
        }
    */
    AppComponent.prototype.setMode = function (mode) {
        this.selectedMode = mode;
        //this.router.navigate(['/'+mode]);
        if (mode == "install") {
            this.getAppsStoreApps();
        }
        else {
            this.getInstalledApps();
        }
    };
    AppComponent.prototype.loadLaunchPage = function () {
        this.net.loadLaunchPage();
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        //pipes: [AppFilterPipe],
        templateUrl: 'appstore/app/app.component.html',
        styleUrls: ['appstore/app/app.component.css'],
    }),
    __metadata("design:paramtypes", [appmanager_service_1.AppManagerService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map