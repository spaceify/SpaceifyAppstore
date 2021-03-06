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
var FrontpageComponent = (function () {
    function FrontpageComponent(_appservice) {
        this._appservice = _appservice;
        this.apps = {};
        this.appsAll = [];
        this.appTypes = [];
        if (typeof (SpaceifyConfig) === "function")
            this.config = new SpaceifyConfig();
        this.appTypes = this.config.get("APP_TYPES");
        for (var i = 0; i < this.appTypes.length; i++)
            this.apps[this.appTypes[i]] = [];
    }
    FrontpageComponent.prototype.doSearch = function (str) {
        this.getInstalledApps();
    };
    FrontpageComponent.prototype.getInstalledApps = function () {
        this.appsAll = this._appservice.getInstalledApps();
        for (var i = 0; i < this.appTypes.length; i++)
            this.apps[this.appTypes[i]] = [];
        while (this.appsAll.length > 0) {
            var app = this.appsAll.shift();
            this.apps[app.type].push(app);
        }
        this._appservice.updateInstalledApplicationsList();
    };
    FrontpageComponent.prototype.ngOnInit = function () {
        console.log("appstore.component: ngOnInit");
        this._appservice.updateInstalledApplicationsList();
        this.getInstalledApps();
    };
    FrontpageComponent.prototype.ngOnDestroy = function () {
        console.log("frontpage.component: ngOnDestroy");
    };
    return FrontpageComponent;
}());
FrontpageComponent = __decorate([
    core_1.Component({
        selector: 'frontpage',
        templateUrl: 'appstore/app/frontpage.component.html',
        styleUrls: ['appstore/app/frontpage.component.css'],
    }),
    __metadata("design:paramtypes", [appmanager_service_1.AppManagerService])
], FrontpageComponent);
exports.FrontpageComponent = FrontpageComponent;
//# sourceMappingURL=frontpage.component.js.map