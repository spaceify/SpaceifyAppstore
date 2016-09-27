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
var appmanager_service_1 = require('./appmanager.service');
var InstallComponent = (function () {
    function InstallComponent(_appservice) {
        this._appservice = _appservice;
        this.selectedMode = "install";
    }
    InstallComponent.prototype.doSearch = function (str) {
        this._appservice.searchAppStore(str);
    };
    InstallComponent.prototype.getAppsStoreApps = function () {
        this.apps = this._appservice.getAppsStoreApps();
    };
    InstallComponent.prototype.getInstalledApps = function () {
        this.apps = this._appservice.getInstalledApps();
        this._appservice.updateInstalledApplicationsList();
    };
    InstallComponent.prototype.ngOnInit = function () {
        console.log("install.component: ngOnInit");
        this.getAppsStoreApps();
        this._appservice.updateInstalledApplicationsList();
        this._appservice.searchAppStore();
        this.getAppsStoreApps();
    };
    InstallComponent.prototype.ngOnDestroy = function () {
        console.log("install.component: ngOnDestroy");
    };
    InstallComponent = __decorate([
        core_1.Component({
            selector: 'install',
            templateUrl: 'app/install.component.html',
            styleUrls: ['app/install.component.css'],
        }), 
        __metadata('design:paramtypes', [appmanager_service_1.AppManagerService])
    ], InstallComponent);
    return InstallComponent;
}());
exports.InstallComponent = InstallComponent;
//# sourceMappingURL=install.component.js.map