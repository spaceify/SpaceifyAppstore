"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
require("rxjs/Rx");
var appitem_1 = require("./appitem");
var Rx_1 = require("rxjs/Rx");
var spaceifyhandler_1 = require("./spaceifyhandler");
var appmanager_service_1 = require("./appmanager.service");
var MockService = (function (_super) {
    __extends(MockService, _super);
    function MockService(http) {
        var _this = _super.call(this) || this;
        _this.http = http;
        //private appstoreApps: AppItem[] = [];
        //private installedApps: AppItem[] = [];
        _this.mockMessages = [];
        _this.messageHandler = new spaceifyhandler_1.SpaceifyHandler();
        _this.http.get('appstore/app/mock-data_appstoreapps.json')
            .map(_this.extractData)
            .map(_this.mapData)
            .catch(_this.handleError)
            .subscribe(function (data) {
            _this.appStoreApps = data;
            console.log(data);
        }, function (err) {
            //this.apps_error = true
        });
        _this.http.get('appstore/app/mock-data_installedapps.json')
            .map(_this.extractData)
            .map(_this.mapData)
            .map(_this.setAsInstalled)
            .catch(_this.handleError)
            .subscribe(function (data) {
            _this.installedApps = data;
            console.log(data);
        }, function (err) {
            //this.apps_error = true
        });
        return _this;
    }
    MockService.prototype.searchAppStore = function (name) {
        console.log("Searched: " + name);
    };
    /*
    getAppstoreApp(unique_name: string) :AppItem
        {
        for(var appStoreApp of this.appstoreApps)
            {
            if(appStoreApp.unique_name == unique_name )
                return appStoreApp;
            }
    
        return null;
        }
    
    getInstalledApp(unique_name: string) :AppItem
        {
        for(var InstalledApp of this.installedApps)
            {
            if(InstalledApp.unique_name == unique_name)
                return InstalledApp;
            }
    
        return null;
        }
    */
    MockService.prototype.updateInstalledApplicationsList = function () {
        var self = this;
        // Update appstore apps list also
        for (var _i = 0, _a = self.appStoreApps; _i < _a.length; _i++) {
            var appItem = _a[_i];
            if (self.isAppInstalled(appItem)) {
                appItem.isInstalled = true;
            }
        }
    };
    Object.defineProperty(MockService.prototype, "serverMessages", {
        get: function () {
            return this.mockMessages;
        },
        enumerable: true,
        configurable: true
    });
    MockService.prototype.isAppRunning = function (unique_name) {
    };
    /*
    isAppInstalled(app : AppItem) : boolean
        {
        if(app)
            {
            for(var installedApp of this.installedApps)
                {
                if(installedApp.unique_name == app.unique_name)
                    {
                    app.isInstalled = true;
                    return true;
                    }
                }
            }
    
        app.isInstalled = false;
        return false;
        }
    */
    /*
    getAppsStoreApps(): Array<AppItem>
        {
        return this.appstoreApps;
        }
    
    getInstalledApps(): Array<AppItem>
        {
        return this.installedApps;
        }
    */
    MockService.prototype.commandApp = function (operation, app) {
        //var id = setInterval(frame, 10);
        //clearInterval(id);
        var serverMessage = { text: "Message: " + operation + " " + app.unique_name, type: spaceifyhandler_1.ServerMessageType.Message };
        this.mockMessages.push(serverMessage);
        var self = this;
        setTimeout(function () {
            serverMessage = { text: "Notification: " + operation + " " + app.unique_name, type: spaceifyhandler_1.ServerMessageType.Notify };
            self.mockMessages.push(serverMessage);
            setTimeout(function () {
                serverMessage = { text: "Warning: " + operation + " " + app.unique_name, type: spaceifyhandler_1.ServerMessageType.Warning };
                self.mockMessages.push(serverMessage);
            }, 300);
            setTimeout(function () {
                serverMessage = { text: "Error: " + operation + " " + app.unique_name, type: spaceifyhandler_1.ServerMessageType.Error };
                self.mockMessages.push(serverMessage);
            }, 300);
        }, 300);
        if (operation == "logOut") { }
        else if (operation == "stop") {
            app.isRunning = false;
        }
        else if (operation == "start") {
            app.isRunning = true;
        }
        else if (operation == "restart") {
            app.isRunning = false;
            setTimeout(function () {
                app.isRunning = true;
            }, 1000);
        }
        else if (operation == "remove") {
            for (var _i = 0, _a = this.installedApps; _i < _a.length; _i++) {
                var installedApp = _a[_i];
                if (installedApp.unique_name == app.unique_name) {
                    var i = this.installedApps.indexOf(installedApp);
                    if (i != -1) {
                        this.installedApps.splice(i, 1);
                    }
                    break;
                }
            }
        }
        else if (operation == "install") {
            var found = false;
            for (var _b = 0, _c = this.installedApps; _b < _c.length; _b++) {
                var installedApp = _c[_b];
                if (installedApp.unique_name == app.unique_name) {
                    found = true;
                }
            }
            if (!found)
                this.installedApps.push(app);
        }
        else if (operation == "update") {
        }
    };
    MockService.prototype.getServerMessageStyle = function (type) {
        if (type == spaceifyhandler_1.ServerMessageType.Message)
            return "serverMessageMessage";
        else if (type == spaceifyhandler_1.ServerMessageType.Error)
            return "serverMessageError";
        else if (type == spaceifyhandler_1.ServerMessageType.Warning)
            return "serverMessageWarning";
        else if (type == spaceifyhandler_1.ServerMessageType.Notify)
            return "serverMessageNotify";
    };
    MockService.prototype.clearLogMessages = function () {
        this.mockMessages.length = 0;
    };
    MockService.prototype.checkAppChanges = function (app) {
        if (Math.random() >= 0.5)
            app.updateAvailable = true;
        else
            app.updateAvailable = false;
    };
    MockService.prototype.extractData = function (res) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        var body = res.json();
        console.log(body);
        //var app =
        return body || {};
    };
    MockService.prototype.mapData = function (apps) {
        var result = [];
        console.log(apps);
        if (apps) {
            apps.forEach(function (app) {
                result.push(new appitem_1.AppItem(app));
            });
        }
        return result;
    };
    MockService.prototype.setAsInstalled = function (apps) {
        if (apps) {
            apps.forEach(function (app) {
                app.isInstalled = true;
            });
        }
        return apps;
    };
    MockService.prototype.handleError = function (error) {
        // In a real world app we might send the error to remote logging infrastructure
        var errMsg = error.message || 'Server error';
        console.error(errMsg);
        return Rx_1.Observable.throw(errMsg);
    };
    return MockService;
}(appmanager_service_1.AppManagerService));
MockService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], MockService);
exports.MockService = MockService;
//# sourceMappingURL=appmanager.mockservice.js.map