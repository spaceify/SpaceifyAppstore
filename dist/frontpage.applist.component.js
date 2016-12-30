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
var FrontpageApplistComponent = (function () {
    function FrontpageApplistComponent(_appservice, router) {
        this._appservice = _appservice;
        this.router = router;
    }
    FrontpageApplistComponent.prototype.onSelect = function (app) {
    };
    return FrontpageApplistComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], FrontpageApplistComponent.prototype, "apps", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], FrontpageApplistComponent.prototype, "selectedMode", void 0);
FrontpageApplistComponent = __decorate([
    core_1.Component({
        selector: 'frontpageapplist',
        templateUrl: 'appstore/app/frontpage.applist.component.html',
        styleUrls: ['appstore/app/frontpage.applist.component.css']
    }),
    __metadata("design:paramtypes", [appmanager_service_1.AppManagerService, router_1.Router])
], FrontpageApplistComponent);
exports.FrontpageApplistComponent = FrontpageApplistComponent;
//# sourceMappingURL=frontpage.applist.component.js.map