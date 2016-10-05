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
var router_1 = require('@angular/router');
var appmanager_service_1 = require('./appmanager.service');
var appitem_1 = require('./appitem');
var AppItemComponent = (function () {
    function AppItemComponent(_appservice, router) {
        this._appservice = _appservice;
        this.router = router;
    }
    AppItemComponent.prototype.getApp = function () {
        return this.app;
    };
    AppItemComponent.prototype.onSelect = function (app) {
        this.app = app;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', appitem_1.AppItem)
    ], AppItemComponent.prototype, "app", void 0);
    AppItemComponent = __decorate([
        core_1.Component({
            selector: 'appitem',
            templateUrl: 'app/appitem.component.html',
            styleUrls: ['app/appitem.component.css']
        }), 
        __metadata('design:paramtypes', [appmanager_service_1.AppManagerService, router_1.Router])
    ], AppItemComponent);
    return AppItemComponent;
}());
exports.AppItemComponent = AppItemComponent;
//# sourceMappingURL=appitem.component.js.map