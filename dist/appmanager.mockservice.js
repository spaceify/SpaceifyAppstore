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
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
require('rxjs/Rx');
var appitem_1 = require('./appitem');
var Rx_1 = require('rxjs/Rx');
var spaceifyhandler_1 = require('./spaceifyhandler');
var MockService = (function () {
    function MockService(http) {
        var _this = this;
        this.http = http;
        this.appstoreApps = [];
        this.installedApps = [];
        this.mockMessages = [];
        this.http.get('app/mock-data_appstoreapps.json')
            .map(this.extractData)
            .map(this.mapData)
            .catch(this.handleError)
            .subscribe(function (data) {
            _this.appstoreApps = data;
            console.log(data);
        }, function (err) {
            //this.apps_error = true 
        });
        this.http.get('app/mock-data_installedapps.json')
            .map(this.extractData)
            .map(this.mapData)
            .map(this.setAsInstalled)
            .catch(this.handleError)
            .subscribe(function (data) {
            _this.installedApps = data;
            console.log(data);
        }, function (err) {
            //this.apps_error = true 
        });
    }
    MockService.prototype.searchAppStore = function (name) {
        console.log("Searched: " + name);
    };
    MockService.prototype.getAppstoreApp = function (unique_name) {
        for (var _i = 0, _a = this.appstoreApps; _i < _a.length; _i++) {
            var appStoreApp = _a[_i];
            if (appStoreApp.unique_name == unique_name)
                return appStoreApp;
        }
        return null;
    };
    MockService.prototype.getInstalledApp = function (unique_name) {
        for (var _i = 0, _a = this.installedApps; _i < _a.length; _i++) {
            var InstalledApp = _a[_i];
            if (InstalledApp.unique_name == unique_name)
                return InstalledApp;
        }
        return null;
    };
    MockService.prototype.updateInstalledApplicationsList = function () { };
    Object.defineProperty(MockService.prototype, "serverMessages", {
        get: function () {
            return this.mockMessages;
        },
        enumerable: true,
        configurable: true
    });
    MockService.prototype.isAppRunning = function (unique_name) {
    };
    MockService.prototype.isAppInstalled = function (app) {
        if (app) {
            for (var _i = 0, _a = this.installedApps; _i < _a.length; _i++) {
                var installedApp = _a[_i];
                if (installedApp.unique_name == app.unique_name) {
                    app.isInstalled = true;
                    return true;
                }
            }
        }
        app.isInstalled = false;
        return false;
    };
    MockService.prototype.getAppsStoreApps = function () {
        return this.appstoreApps;
    };
    MockService.prototype.getInstalledApps = function () {
        return this.installedApps;
    };
    MockService.prototype.commandApp = function (operation, app) {
        //var id = setInterval(frame, 10);
        //clearInterval(id);
        var serverMessage = { text: "Message: " + operation + " " + app.unique_name, type: spaceifyhandler_1.ServerMessageType.Message };
        this.mockMessages.push(serverMessage);
        var self = this;
        setTimeout(function () {
            serverMessage = { text: "Notification: " + operation + " " + app.unique_name, type: spaceifyhandler_1.ServerMessageType.Notification };
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
    MockService.prototype.getServerMessageColor = function (type) {
        if (type == spaceifyhandler_1.ServerMessageType.Error)
            return "red";
        else if (type == spaceifyhandler_1.ServerMessageType.Warning)
            return "yellow";
        else if (type == spaceifyhandler_1.ServerMessageType.Notification)
            return "blue";
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
    MockService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], MockService);
    return MockService;
}());
exports.MockService = MockService;
//# sourceMappingURL=appmanager.mockservice.js.map