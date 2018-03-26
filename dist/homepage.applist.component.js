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
var router_1 = require("@angular/router");
var appmanager_service_1 = require("./appmanager.service");
var HomepageApplistComponent = (function () {
    function HomepageApplistComponent(_appservice, router) {
        this._appservice = _appservice;
        this.router = router;
    }
    HomepageApplistComponent.prototype.onSelect = function (app) {
    };
    return HomepageApplistComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], HomepageApplistComponent.prototype, "apps", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], HomepageApplistComponent.prototype, "selectedMode", void 0);
HomepageApplistComponent = __decorate([
    core_1.Component({
        selector: 'homepageapplist',
        templateUrl: 'appstore/app/homepage.applist.component.html',
        styleUrls: ['appstore/app/homepage.applist.component.css']
    }),
    __metadata("design:paramtypes", [appmanager_service_1.AppManagerService, router_1.Router])
], HomepageApplistComponent);
exports.HomepageApplistComponent = HomepageApplistComponent;
//# sourceMappingURL=homepage.applist.component.js.map