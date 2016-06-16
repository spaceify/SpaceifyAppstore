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
var http_1 = require('@angular/http');
var app_service_1 = require('./app.service');
var app_pipe_1 = require('./app.pipe');
var AppComponent = (function () {
    //public apps_error: Boolean = false;
    //servermessages: string[];
    //ngzone not needed
    function AppComponent(_appservice, _ngZone) {
        this._appservice = _appservice;
        this._ngZone = _ngZone;
        this.selectedMode = "Install";
        this.query = "";
    }
    AppComponent.prototype.getServerMessageColor = function (type) {
        //if(type == Ser)
        //ServerMessage.
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
            this._appservice.commandApp(command, selectedApp.uniquename);
    };
    AppComponent.prototype.ngOnInit = function () {
    };
    AppComponent.prototype.ngOnDestroy = function () {
        //window.angularComponent = null;
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
            providers: [http_1.HTTP_PROVIDERS, app_service_1.AppService]
        }), 
        __metadata('design:paramtypes', [app_service_1.AppService, core_1.NgZone])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map