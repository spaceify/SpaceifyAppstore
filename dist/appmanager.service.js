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
require('rxjs/add/operator/map');
require('rxjs/Rx');
var appitem_1 = require('./appitem');
var spaceifyhandler_1 = require('./spaceifyhandler');
var AppManagerService = (function () {
    //private _serverMessages: ServerMessage[] = [];
    function AppManagerService() {
        this.appStoreApps = [];
        this.installedApps = [];
        //super();
        if (typeof (SpaceifyConfig) === "function")
            this.config = new SpaceifyConfig();
        if (typeof (SpaceifyApplicationManager) === "function") {
            this.sam = new SpaceifyApplicationManager();
        }
        if (typeof (SpaceifyCore) === "function")
            this.core = new SpaceifyCore();
        this.messageHandler = new spaceifyhandler_1.SpaceifyHandler();
        //console.log(this.sam);
        //this.core.isApplicationRunning(<paketin nimi>, <callback>);
        //this.initService();
        //console.log("kerran");
    }
    AppManagerService.prototype.initService = function () {
        var self = this;
        //this.searchAppStore();
        //setTimeout( ()=>self.updateInstalledApplicationsList(), 200);
        //self.updateInstalledApplicationsList();
        //console.log("testesetste");
        //self.updateInstalledApplicationsList();
        //this.sam.logIn("spaceify123", self, self.printStatus);
    };
    Object.defineProperty(AppManagerService.prototype, "serverMessages", {
        get: function () {
            return this.messageHandler.serverMessages;
        },
        enumerable: true,
        configurable: true
    });
    AppManagerService.prototype.getServerMessageStyle = function (type) {
        if (type == spaceifyhandler_1.ServerMessageType.Message)
            return "serverMessageMessage";
        else if (type == spaceifyhandler_1.ServerMessageType.Error)
            return "serverMessageError";
        else if (type == spaceifyhandler_1.ServerMessageType.Warning)
            return "serverMessageWarning";
        else if (type == spaceifyhandler_1.ServerMessageType.Notification)
            return "serverMessageNotification";
    };
    AppManagerService.prototype.clearLogMessages = function () {
        this.messageHandler.clearMessages();
    };
    AppManagerService.prototype.testClick = function (name) {
        var self = this;
        this.sam.isAdminLoggedIn(self.messageHandler, self.printStatus);
        //this.isAppRunning(name);
        //self.sam.restartApplication(name, self, self.printStatus);
        //self.sam.removeApplication(name, self, self.printStatus);
    };
    AppManagerService.prototype.searchInstalledApps = function (name) {
        //this.installedApps;
        //this.apps = this._appservice.getInstalledApps(); => this.installedApps;
        //this._appservice.updateInstalledApplicationsList();
    };
    AppManagerService.prototype.searchAppStore = function (name) {
        var _this = this;
        var order = { "name": "ASC" };
        var pageSize = 10;
        var page = 1;
        //var where : {name? : any} = {};
        //var where = { "name": {} };
        var where = {};
        //{ "where": { }, "page": jotain, "pageSize": jotain } 
        //console.log(name);
        if (name) {
            where = { "name": { "value": name, "operator": "LIKE" } };
        }
        //console.log(where);
        //{ "where": {}, "page": jotain, "pageSize": jotain } hakee kaikki
        //console.log(where);
        //where.type = { "value": this.config.SPACELET };
        //where.username = { "value": "*", "operator": "LIKE" };
        var search = {
            "where": {
                "name": { "value": "bigscreen", "operator": "LIKE" },
                "username": { "value": "jouni", "operator": "=" }
            }, "page": 1,
            "pageSize": 20, "order": { "name": "ASC", "username": "ASC" }
        };
        var self = this;
        var searchObject = { "where": where, "page": page, "pageSize": pageSize };
        //var searchObject = { "where": {}, "page": 1, "pageSize": 10 };
        //console.log(searchObject);
        this.sam.appStoreGetPackages(searchObject, function (err, result) {
            _this.appStoreApps.length = 0;
            //console.log(err+" "+result);
            if (result == null) {
                console.log("appStoreGetPackages returned null");
                return;
            }
            for (var _i = 0, _a = result.spacelet; _i < _a.length; _i++) {
                var manifest = _a[_i];
                var appItem = new appitem_1.AppItem(manifest);
                appItem.isInstalled = false;
                self.appStoreApps.push(appItem);
            }
            for (var _b = 0, _c = result.sandboxed; _b < _c.length; _b++) {
                var manifest = _c[_b];
                var appItem = new appitem_1.AppItem(manifest);
                appItem.isInstalled = false;
                self.appStoreApps.push(appItem);
            }
            for (var _d = 0, _e = result.native; _d < _e.length; _d++) {
                var manifest = _e[_d];
                var appItem = new appitem_1.AppItem(manifest);
                appItem.isInstalled = false;
                self.appStoreApps.push(appItem);
            }
        });
    };
    AppManagerService.prototype.getAppstoreApp = function (unique_name) {
        for (var _i = 0, _a = this.appStoreApps; _i < _a.length; _i++) {
            var appStoreApp = _a[_i];
            if (appStoreApp.unique_name == unique_name)
                return appStoreApp;
        }
        return null;
    };
    AppManagerService.prototype.updateInstalledApplicationsList = function () {
        var _this = this;
        var self = this;
        var types = [this.config.SPACELET, this.config.SANDBOXED]; //, this.config.NATIVE];
        //console.log(this.config.SPACELET);
        //this.sam.getApplications(types, self, null);
        //this.sam.getApplications(types, self, this.printStatus);		
        this.sam.getApplications(types, self.messageHandler, function (apps) {
            console.log(apps);
            _this.installedApps.length = 0;
            if (apps == null) {
                console.log("getApplications returned null");
                return;
            }
            else {
                console.log("Updated InstalledApplicationsList");
            }
            for (var _i = 0, _a = apps.sandboxed; _i < _a.length; _i++) {
                var manifest = _a[_i];
                var appItem = new appitem_1.AppItem(manifest);
                appItem.isInstalled = true;
                self.installedApps.push(appItem);
            }
            for (var _b = 0, _c = apps.spacelet; _b < _c.length; _b++) {
                var manifest = _c[_b];
                var appItem = new appitem_1.AppItem(manifest);
                appItem.isInstalled = true;
                self.installedApps.push(appItem);
            }
            /*for (var manifest of apps.native) {
                var appItem:AppItem = new AppItem(manifest);
                appItem.isInstalled = true;
                self.installedApps.push(appItem;
            }*/
            // Update appstore apps list also
            for (var _d = 0, _e = self.appStoreApps; _d < _e.length; _d++) {
                var appItem = _e[_d];
                if (self.isAppInstalled(appItem)) {
                    appItem.isInstalled = true;
                }
            }
        });
    };
    AppManagerService.prototype.getInstalledApp = function (unique_name) {
        for (var _i = 0, _a = this.installedApps; _i < _a.length; _i++) {
            var InstalledApp = _a[_i];
            if (InstalledApp.unique_name == unique_name)
                return InstalledApp;
        }
        return null;
    };
    AppManagerService.prototype.isAppRunning = function (unique_name) {
        this.core.isApplicationRunning(unique_name, function (err, result) {
            console.log(err);
            console.log(result);
        });
    };
    AppManagerService.prototype.checkAppChanges = function (app) {
        var self = this;
        this.core.isApplicationRunning(app.unique_name, function (err, result) {
            console.log(result);
            app.isRunning = result;
        });
        var where = { "unique_name": app.unique_name };
        var searchObject = { "where": where, "page": 1, "pageSize": 10 };
        this.sam.appStoreGetPackages(searchObject, function (err, result) {
            //console.log(err+" "+result);
            if (result == null) {
                console.log("appStoreGetPackages returned null");
                return;
            }
            var appStoreManifest;
            for (var _i = 0, _a = result.spacelet; _i < _a.length; _i++) {
                var manifest = _a[_i];
                appStoreManifest = manifest;
            }
            for (var _b = 0, _c = result.sandboxed; _b < _c.length; _b++) {
                var manifest = _c[_b];
                appStoreManifest = manifest;
            }
            /*for (var manifest of result.native) {
                appStoreManifest = manifest;
            }*/
            //console.log(appStoreManifest);
            if (app.version_canonical < appStoreManifest.version_canonical) {
                app.updateAvailable = true;
            }
        });
    };
    AppManagerService.prototype.isAppInstalled = function (app) {
        if (app) {
            for (var _i = 0, _a = this.installedApps; _i < _a.length; _i++) {
                var installedApp = _a[_i];
                if (installedApp.unique_name == app.unique_name) {
                    installedApp.isInstalled = true;
                    return true;
                }
            }
        }
        installedApp.isInstalled = false;
        return false;
    };
    /*
    checkAppStatus(message : string){

    }
    */
    AppManagerService.prototype.getAppsStoreApps = function () {
        return this.appStoreApps;
    };
    AppManagerService.prototype.getInstalledApps = function () {
        return this.installedApps;
    };
    AppManagerService.prototype.commandApp = function (operation, app) {
        //this._serverMessages.push(operation);
        console.log(operation);
        var self = this;
        if (operation == "logOut")
            self.sam.logOut(self.messageHandler, self.printStatus);
        else if (operation == "stop")
            self.sam.stopApplication(app.unique_name, self.messageHandler, function (message) {
                console.log(message);
                self.core.isApplicationRunning(app.unique_name, function (err, result) {
                    console.log(result);
                    app.isRunning = result;
                });
            });
        else if (operation == "start")
            self.sam.startApplication(app.unique_name, self.messageHandler, function (message) {
                console.log(message);
                self.core.isApplicationRunning(app.unique_name, function (err, result) {
                    console.log(result);
                    app.isRunning = result;
                });
            });
        else if (operation == "restart")
            self.sam.restartApplication(app.unique_name, self.messageHandler, function (message) {
                console.log(message);
                self.core.isApplicationRunning(app.unique_name, function (err, result) {
                    console.log(result);
                    app.isRunning = result;
                });
            });
        else if (operation == "remove")
            self.sam.removeApplication(app.unique_name, self.messageHandler, function (message) {
                self.updateInstalledApplicationsList();
                console.log(message);
            });
        else if (operation == "install") {
            //console.log(unique_name);
            self.sam.installApplication(app.unique_name, "", "", true, self.messageHandler, function (message) {
                self.updateInstalledApplicationsList();
                console.log(message);
            });
        }
        else if (operation == "update") {
            self.sam.installApplication(app.unique_name, "", "", true, self.messageHandler, function (message) {
                self.updateInstalledApplicationsList();
                console.log(message);
            });
        }
    };
    AppManagerService.prototype.printStatus = function (result) {
        console.log(result);
    };
    AppManagerService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], AppManagerService);
    return AppManagerService;
}());
exports.AppManagerService = AppManagerService;
//# sourceMappingURL=appmanager.service.js.map