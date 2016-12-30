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
var LaunchPageComponent = (function () {
    function LaunchPageComponent(_appservice) {
        this._appservice = _appservice;
        this.apps = {};
        this.appsAll = [];
        this.appTypes = [];
        if (typeof (SpaceifyConfig) === "function")
            this.config = new SpaceifyConfig();
        this.appTypes = this.config.get("APP_TYPES");
        console.log("----------------------------", this.appTypes);
        for (var i = 0; i < this.appTypes.length; i++)
            this.apps[this.appTypes[i]] = [];
    }
    LaunchPageComponent.prototype.doSearch = function (str) {
        this.getInstalledApps();
    };
    LaunchPageComponent.prototype.getInstalledApps = function () {
        this.appsAll = this._appservice.getInstalledApps();
        for (var i = 0; i < this.appTypes.length; i++)
            this.apps[this.appTypes[i]] = [];
        while (this.appsAll.length > 0) {
            var app = this.appsAll.shift();
            this.apps[app.type].push(app);
        }
        console.log("--------------", this.apps);
        this._appservice.updateInstalledApplicationsList();
    };
    LaunchPageComponent.prototype.ngOnInit = function () {
        console.log("appstore.component: ngOnInit");
        this._appservice.updateInstalledApplicationsList();
        this.getInstalledApps();
    };
    LaunchPageComponent.prototype.ngOnDestroy = function () {
        console.log("launchpage.component: ngOnDestroy");
    };
    return LaunchPageComponent;
}());
LaunchPageComponent = __decorate([
    core_1.Component({
        selector: 'launchpage',
        templateUrl: 'appstore/app/launchpage.component.html',
        styleUrls: ['appstore/app/launchpage.component.css'],
    }),
    __metadata("design:paramtypes", [appmanager_service_1.AppManagerService])
], LaunchPageComponent);
exports.LaunchPageComponent = LaunchPageComponent;
//# sourceMappingURL=launchpage.component.js.map