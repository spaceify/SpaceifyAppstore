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
var appmanager_service_1 = require("./appmanager.service");
var ManageComponent = (function () {
    function ManageComponent(_appservice) {
        this._appservice = _appservice;
        this.appsAll = [];
        this.apps = [];
        this.selectedMode = "manage";
        this.searchString = "";
    }
    ManageComponent.prototype.doSearch = function (str) {
        this.searchString = str;
        this.getInstalledApps();
    };
    ManageComponent.prototype.getAppsStoreApps = function () {
        this.apps = this._appservice.getAppsStoreApps();
    };
    ManageComponent.prototype.getInstalledApps = function () {
        var _this = this;
        this.appsAll = this._appservice.getInstalledApps();
        if (this.searchString == "") {
            this.apps = this.appsAll;
        }
        else {
            this.apps = this.appsAll.filter(function (app) { return app.name.toLowerCase().indexOf(_this.searchString.toLowerCase()) != -1; });
        }
        this._appservice.updateInstalledApplicationsList();
    };
    ManageComponent.prototype.ngOnInit = function () {
        console.log("manage.component: ngOnInit");
        this.getAppsStoreApps();
        this._appservice.updateInstalledApplicationsList();
        this._appservice.searchAppStore();
        this.getInstalledApps();
    };
    ManageComponent.prototype.ngOnDestroy = function () {
        console.log("manage.component: ngOnDestroy");
    };
    return ManageComponent;
}());
ManageComponent = __decorate([
    core_1.Component({
        selector: 'manage',
        templateUrl: 'appstore/app/manage.component.html',
        styleUrls: ['appstore/app/manage.component.css'],
    }),
    __metadata("design:paramtypes", [appmanager_service_1.AppManagerService])
], ManageComponent);
exports.ManageComponent = ManageComponent;
//# sourceMappingURL=manage.component.js.map