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
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var app_component_1 = require("./app.component");
var launchpage_applist_component_1 = require("./launchpage.applist.component");
var applist_component_1 = require("./applist.component");
var appitem_component_1 = require("./appitem.component");
var contextbar_component_1 = require("./contextbar.component");
var launchpage_component_1 = require("./launchpage.component");
var manage_component_1 = require("./manage.component");
var manageapp_component_1 = require("./manageapp.component");
var install_component_1 = require("./install.component");
var installapp_component_1 = require("./installapp.component");
var intro_1 = require("./intro");
var _404_1 = require("./404");
var spaceifysrc_directive_1 = require("./spaceifysrc.directive");
var spaceifybgnd_directive_1 = require("./spaceifybgnd.directive");
//import {HTTP_PROVIDERS} from '@angular/http';
var appmanager_service_1 = require("./appmanager.service");
var app_routes_1 = require("./app.routes");
//import{ WindowRef } from './windowref';
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            app_routes_1.routing
        ],
        declarations: [
            app_component_1.AppComponent,
            launchpage_applist_component_1.LaunchPageApplistComponent,
            applist_component_1.ApplistComponent,
            appitem_component_1.AppItemComponent,
            contextbar_component_1.ContextbarComponent,
            launchpage_component_1.LaunchPageComponent,
            manage_component_1.ManageComponent,
            manageapp_component_1.ManageAppComponent,
            install_component_1.InstallComponent,
            installapp_component_1.InstallAppComponent,
            intro_1.IntroComponent,
            _404_1.PageNotFoundComponent,
            spaceifysrc_directive_1.SpaceifySourceDirective,
            spaceifybgnd_directive_1.SpaceifyBgndDirective
        ],
        providers: [
            { provide: appmanager_service_1.AppManagerService, useClass: appmanager_service_1.AppManagerService },
        ],
        bootstrap: [
            app_component_1.AppComponent
        ]
    }),
    __metadata("design:paramtypes", [])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map