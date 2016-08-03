"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var app_component_1 = require('./app.component');
var http_1 = require('@angular/http');
var appmanager_service_1 = require('./appmanager.service');
//bootstrap(AppComponent, [{ provide: AppManagerService, useClass: MockService }, HTTP_PROVIDERS]);
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [appmanager_service_1.AppManagerService, http_1.HTTP_PROVIDERS]);
//# sourceMappingURL=main.js.map