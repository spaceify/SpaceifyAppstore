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
//import {SpaceifySourceDirective} from './spaceifysrc.directive';
var ApplistComponent = (function () {
    function ApplistComponent(_appservice, router) {
        this._appservice = _appservice;
        this.router = router;
    }
    ApplistComponent.prototype.getSelectedApp = function () {
        return this.selectedApp;
    };
    ApplistComponent.prototype.onSelect = function (app) {
        this.selectedApp = app;
        this._appservice.clearLogMessages();
        this._appservice.checkAppChanges(app);
        //console.log(this.selectedMode);
        //var parsedName =  app.unique_name.replace("/", "_");
        var encodedUnique_name = encodeURIComponent(app.unique_name);
        this.router.navigate(['/' + this.selectedMode, encodedUnique_name]);
        //lue path ja lisää unique_name
        //this.selected.next({ value: app });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], ApplistComponent.prototype, "apps", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ApplistComponent.prototype, "selectedMode", void 0);
    ApplistComponent = __decorate([
        core_1.Component({
            selector: 'applist',
            templateUrl: 'app/applist.component.html',
            styleUrls: ['app/applist.component.css']
        }), 
        __metadata('design:paramtypes', [appmanager_service_1.AppManagerService, router_1.Router])
    ], ApplistComponent);
    return ApplistComponent;
}());
exports.ApplistComponent = ApplistComponent;
//# sourceMappingURL=applist.component.js.map