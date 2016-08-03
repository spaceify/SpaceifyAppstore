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
var core_1 = require('@angular/core');
var core_2 = require('@angular/core');
var common_1 = require("@angular/common");
//import {HTTP_PROVIDERS } from '@angular/http';
var appmanager_service_1 = require('./appmanager.service');
var applist_component_1 = require('./applist.component');
var app_pipe_1 = require('./app.pipe');
require('rxjs/add/operator/map');
require('rxjs/add/operator/debounceTime');
require('rxjs/add/operator/distinctUntilChanged');
require('rxjs/add/operator/switchMap');
//depracated
//import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
var AppComponent = (function () {
    //term = new Control();
    function AppComponent(_appservice) {
        this._appservice = _appservice;
        //selectedApp: AppItem;
        this.selectedMode = "Install";
        this.query = new common_1.Control();
        this.query.valueChanges
            .debounceTime(400)
            .distinctUntilChanged()
            .subscribe(function (value) {
            console.log('changed to:', value);
            _appservice.searchAppStore(value);
        });
        //.switchMap(term => this.wikipediaService.search(term));
    }
    AppComponent.prototype.getServerMessageColor = function (type) {
        if (type == appmanager_service_1.ServerMessageType.Error)
            return "red";
        else if (type == appmanager_service_1.ServerMessageType.Warning)
            return "yellow";
        else if (type == appmanager_service_1.ServerMessageType.Notification)
            return "blue";
    };
    AppComponent.prototype.getAppsStoreApps = function () {
        this.apps = this._appservice.getAppsStoreApps();
    };
    AppComponent.prototype.getInstalledApps = function () {
        this.apps = this._appservice.getInstalledApps();
    };
    AppComponent.prototype.commandApp = function (selectedApp, command) {
        if (selectedApp)
            this._appservice.commandApp(command, selectedApp.unique_name);
    };
    AppComponent.prototype.ngOnInit = function () {
        //console.log("ngOnInit");
        this.getAppsStoreApps();
    };
    AppComponent.prototype.ngOnDestroy = function () {
    };
    Object.defineProperty(AppComponent.prototype, "selectedApp", {
        get: function () {
            if (this.applistComponent)
                return this.applistComponent.getSelectedApp();
        },
        enumerable: true,
        configurable: true
    });
    /*
    onSelect(app: AppItem) {

        //console.log(app);
        this.selectedApp = app;
        this._appservice.clearLogMessages();


        if (this.selectedMode != "Install"){
            this._appservice.isAppRunning(app.unique_name);
        }
    }

    */
    AppComponent.prototype.setMode = function (mode) {
        this.selectedMode = mode;
        if (mode == "Install")
            this.getAppsStoreApps();
        else
            this.getInstalledApps();
    };
    __decorate([
        core_2.ViewChild(applist_component_1.ApplistComponent), 
        __metadata('design:type', applist_component_1.ApplistComponent)
    ], AppComponent.prototype, "applistComponent", void 0);
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            pipes: [app_pipe_1.AppFilterPipe],
            templateUrl: 'app/app.component.html',
            //providers: [{provide : AppManagerService, useClass: MockService }],
            //providers: [AppManagerService],
            styles: ["\n  \t\t.selected {\n    \t\tbackground-color: #CFD8DC !important;\n    \t\tcolor: white;\n  \t\t}\n  \t"],
            directives: [applist_component_1.ApplistComponent]
        }), 
        __metadata('design:paramtypes', [appmanager_service_1.AppManagerService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map