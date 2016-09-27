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
var SearchBarComponent = (function () {
    function SearchBarComponent(_appservice) {
        this._appservice = _appservice;
        this.selectedMode = 'install'; // "install" or "manage"
    }
    SearchBarComponent.prototype.doSearch = function (str) {
        if (this.selectedMode == "install") {
            this._appservice.searchAppStore(str);
        }
        else {
        }
    };
    SearchBarComponent.prototype.ngOnInit = function () {
        console.log("searchbar.component: ngOnInit");
    };
    SearchBarComponent.prototype.ngOnDestroy = function () {
        console.log("searchbar.component: ngOnDestroy");
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], SearchBarComponent.prototype, "selectedMode", void 0);
    SearchBarComponent = __decorate([
        core_1.Component({
            selector: 'searchbar',
            templateUrl: 'app/searchbar.component.html',
            styleUrls: ['app/searchbar.component.css']
        }), 
        __metadata('design:paramtypes', [appmanager_service_1.AppManagerService])
    ], SearchBarComponent);
    return SearchBarComponent;
}());
exports.SearchBarComponent = SearchBarComponent;
//# sourceMappingURL=searchbar.component.js.map