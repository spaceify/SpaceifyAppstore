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
//import { ROUTER_DIRECTIVES } from '@angular/router';
var router_1 = require('@angular/router');
var appmanager_service_1 = require('./appmanager.service');
var ManageAppComponent = (function () {
    function ManageAppComponent(_appservice, route) {
        this._appservice = _appservice;
        this.route = route;
    }
    ManageAppComponent.prototype.ngOnInit = function () {
        //console.log("ngOnInit");
        //this.getAppsStoreApps();
        //this._appservice.updateInstalledApplicationsList();
        //this._appservice.searchAppStore();
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            var un = decodeURIComponent(params['unique_name']);
            _this.selectedApp = _this._appservice.getInstalledApp(un);
        });
    };
    ManageAppComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    ManageAppComponent = __decorate([
        core_1.Component({
            selector: 'manageapp',
            templateUrl: 'app/manageapp.component.html',
            styleUrls: ['app/app.component.css'],
        }), 
        __metadata('design:paramtypes', [appmanager_service_1.AppManagerService, router_1.ActivatedRoute])
    ], ManageAppComponent);
    return ManageAppComponent;
}());
exports.ManageAppComponent = ManageAppComponent;
//# sourceMappingURL=manageapp.component.js.map