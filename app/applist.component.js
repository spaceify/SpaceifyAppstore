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
var ApplistComponent = (function () {
    function ApplistComponent(_appservice) {
        this._appservice = _appservice;
    }
    ApplistComponent.prototype.getSelectedApp = function () {
        return this.selectedApp;
    };
    ApplistComponent.prototype.onSelect = function (app) {
        this.selectedApp = app;
        this._appservice.clearLogMessages();
        //this.selected.next({ value: app });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], ApplistComponent.prototype, "apps", void 0);
    ApplistComponent = __decorate([
        core_1.Component({
            selector: 'applist',
            templateUrl: 'app/applist.component.html',
            providers: [{ provide: appmanager_service_1.AppManagerService, useClass: appmanager_service_1.MockService }],
            //providers: [AppManagerService],
            styles: ["\n  \t\t.selected {\n    \t\tbackground-color: #CFD8DC !important;\n    \t\tcolor: white;\n  \t\t}\n\n      li.selected:hover {\n      background-color: #BBD8DC !important;\n      color: white;\n      }\n\n      li:hover {\n        color: #607D8B;\n        background-color: #DDD;\n        left: .1em;\n      }\n\n  \n  \t"]
        }), 
        __metadata('design:paramtypes', [appmanager_service_1.AppManagerService])
    ], ApplistComponent);
    return ApplistComponent;
}());
exports.ApplistComponent = ApplistComponent;
//# sourceMappingURL=applist.component.js.map