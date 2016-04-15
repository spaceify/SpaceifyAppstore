System.register(['angular2/core', './app.service', './app.pipe', 'angular2/http'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, app_service_1, app_pipe_1, http_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (app_service_1_1) {
                app_service_1 = app_service_1_1;
            },
            function (app_pipe_1_1) {
                app_pipe_1 = app_pipe_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(_appservice) {
                    this._appservice = _appservice;
                    this.selectedMode = "Install";
                    this.query = "";
                    this.apps_error = false;
                }
                AppComponent.prototype.getApps = function () {
                    //this._appservice.getApps().then(apps => { this.apps = apps; this.selectedApp = apps[0]; });
                    var _this = this;
                    //this._appservice.getManifests().then(apps => { this.apps = apps; this.selectedApp = apps[0]; });
                    //this.apps = this._appservice.getManifests();
                    this._appservice.getManifests().subscribe(function (data) { _this.apps = data; }, function (err) { _this.apps_error = true; });
                };
                AppComponent.prototype.getInstalledApps = function () {
                    //this._appservice.getInstalledApps().then(apps => { this.apps = apps; this.selectedApp = apps[0]; });
                    //this.apps = this._appservice.getManifests();
                };
                AppComponent.prototype.ngOnInit = function () {
                    this.getApps();
                    //this.selectedMode = "Install";
                    //this.selectedApp = this.apps[0];
                };
                AppComponent.prototype.onSelect = function (app) { this.selectedApp = app; };
                AppComponent.prototype.setMode = function (mode) {
                    this.selectedMode = mode;
                    if (mode == "Install")
                        this.getApps();
                    else
                        this.getInstalledApps();
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        pipes: [app_pipe_1.AppFilterPipe],
                        templateUrl: 'app/app.component.html',
                        providers: [http_1.HTTP_PROVIDERS, app_service_1.AppService]
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof app_service_1.AppService !== 'undefined' && app_service_1.AppService) === 'function' && _a) || Object])
                ], AppComponent);
                return AppComponent;
                var _a;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map