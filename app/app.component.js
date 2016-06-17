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
var common_1 = require("@angular/common");
//import {HTTP_PROVIDERS } from '@angular/http';
var app_service_1 = require('./app.service');
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
        if (type == app_service_1.ServerMessageType.Error)
            return "red";
        else if (type == app_service_1.ServerMessageType.Warning)
            return "yellow";
        else if (type == app_service_1.ServerMessageType.Notification)
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
    AppComponent.prototype.onSelect = function (app) {
        this.selectedApp = app;
        this._appservice.clearLogMessages();
    };
    AppComponent.prototype.setMode = function (mode) {
        this.selectedMode = mode;
        if (mode == "Install")
            this.getAppsStoreApps();
        else
            this.getInstalledApps();
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            pipes: [app_pipe_1.AppFilterPipe],
            templateUrl: 'app/app.component.html',
            providers: [app_service_1.AppService]
        }), 
        __metadata('design:paramtypes', [app_service_1.AppService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map