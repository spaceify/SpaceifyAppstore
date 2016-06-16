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
//import {APPS, INSTALLEDAPPS} from './mock-apps';
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
require('rxjs/Rx');
var appitem_1 = require('./appitem');
(function (ServerMessageType) {
    ServerMessageType[ServerMessageType["Message"] = 0] = "Message";
    ServerMessageType[ServerMessageType["Warning"] = 1] = "Warning";
    ServerMessageType[ServerMessageType["Notification"] = 2] = "Notification";
    ServerMessageType[ServerMessageType["Error"] = 3] = "Error";
})(exports.ServerMessageType || (exports.ServerMessageType = {}));
var ServerMessageType = exports.ServerMessageType;
var AppService = (function () {
    function AppService(http) {
        this.http = http;
        this.appStoreApps = [];
        this.installedApps = [];
        this._serverMessages = [];
        this.config = new SpaceifyConfig();
        this.sam = new SpaceifyApplicationManager();
        var order = { "name": "ASC" };
        var pageSize = 10;
        var page = 1;
        var where = {};
        //where.name = { "value": "pictureviewer", "operator": "LIKE" };
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
        this.sam.appStoreGetPackages({ "where": where, "order": order, "page": page, "pageSize": pageSize }, function (err, result) {
            if (result == null) {
                console.log("appStoreGetPackages returned null");
                return;
            }
            for (var _i = 0, _a = result.spacelet; _i < _a.length; _i++) {
                var app = _a[_i];
                self.appStoreApps.push(new appitem_1.AppItem(app.name, app.unique_name, app.readme, app.icon));
            }
            for (var _b = 0, _c = result.sandboxed; _b < _c.length; _b++) {
                var app = _c[_b];
                self.appStoreApps.push(new appitem_1.AppItem(app.name, app.unique_name, app.readme, app.icon));
            }
        });
        this.updateInstalledApplicationsList();
    }
    Object.defineProperty(AppService.prototype, "serverMessages", {
        get: function () {
            return this._serverMessages;
        },
        enumerable: true,
        configurable: true
    });
    AppService.prototype.clearLogMessages = function () {
        this._serverMessages = [];
    };
    AppService.prototype.updateInstalledApplicationsList = function () {
        this.installedApps = [];
        var self = this;
        var types = [this.config.SPACELET, this.config.SANDBOXED /*, config.NATIVE*/];
        this.sam.getApplications(types, self, function (apps) {
            console.log(apps);
            if (apps == null) {
                console.log("getApplications returned null");
                return;
            }
            for (var _i = 0, _a = apps.spacelet; _i < _a.length; _i++) {
                var app = _a[_i];
                self.installedApps.push(new appitem_1.AppItem(app.name, app.unique_name, app.readme, app.icon));
            }
            for (var _b = 0, _c = apps.sandboxed; _b < _c.length; _b++) {
                var app = _c[_b];
                self.installedApps.push(new appitem_1.AppItem(app.name, app.unique_name, app.readme, app.icon));
            }
        });
    };
    AppService.prototype.getAppsStoreApps = function () {
        return this.appStoreApps;
    };
    AppService.prototype.getInstalledApps = function () {
        return this.installedApps;
    };
    AppService.prototype.commandApp = function (operation, unique_name) {
        //this._serverMessages.push(operation);
        var self = this;
        if (operation == "logOut")
            self.sam.logOut(self, self.printStatus);
        else if (operation == "stop")
            self.sam.stopApplication(unique_name, self, self.printStatus);
        else if (operation == "start")
            self.sam.startApplication(unique_name, self, self.printStatus);
        else if (operation == "restart")
            self.sam.restartApplication(unique_name, self, self.printStatus);
        else if (operation == "remove")
            self.sam.removeApplication(unique_name, self, function (result) {
                console.log(result);
                self.updateInstalledApplicationsList();
            });
        else if (operation == "install")
            self.sam.installApplication(unique_name, "", "", self, function (result) {
                console.log(result);
                self.updateInstalledApplicationsList();
            });
    };
    AppService.prototype.printStatus = function (result) {
        console.log(result);
    };
    AppService.prototype.failed = function () {
        console.log("Application manager: connection failed");
        //$("#adminContainerRight").append($("<div>Setting up the messaging connection failed. There will be no messages or questions from the Application Manager.</div>"));
    };
    AppService.prototype.error = function (errors) {
        //$("#adminContainerRight").append($("<div><h3>There were " + errors.length + " error(s) during the operation:</h3></div><br>"));
        /*
        for (var i = 0; i < errors.length; i++) {
            for (var j = 0; j < errors[i].messages.length; j++){
                //$("#adminContainerRight").append($("<div style='color: #f00; font-weight: bold;'><i>" + errors[i].codes[j] + "</i> <b>" + errors[i].messages[j] + "</b></div><br>"));
                console.log(errors[i].codes[j]+" "+errors[i].messages[j]);
            }
        }
        */
        for (var _i = 0, errors_1 = errors; _i < errors_1.length; _i++) {
            var err = errors_1[_i];
            /*
            for (var i = 0; i < err.messages.length; i++){
                console.log(err.codes[i] + err.messages[i]);
            }
            */
            var serverMessage = { text: err.code + " " + err.message, type: ServerMessageType.Error };
            console.log(err.code + " " + err.message);
            //this._serverMessages.push(err.code + ": " + err.message);
            this._serverMessages.push(serverMessage);
        }
    };
    AppService.prototype.warning = function (message, code) {
        console.log(code + " " + message);
        //this._serverMessages.push(code + ": " + message);
        var serverMessage = { text: code + " " + message, type: ServerMessageType.Warning };
        this._serverMessages.push(serverMessage);
    };
    AppService.prototype.notify = function (message, code) {
        //$("#adminContainerRight").append($("<div style='color: #32af32;'><br>" + message + "<br></div>"));
        console.log(code + " " + message);
        //this._serverMessages.push(code + ": " + message);
        var serverMessage = { text: code + " " + message, type: ServerMessageType.Notification };
        this._serverMessages.push(serverMessage);
    };
    AppService.prototype.message = function (message) {
        //<!--General messages from the Application manager -- >
        //	$("#adminContainerRight").append($("<div>" + (message != "" ? message : "<br>") + "</div>"));
        console.log(message);
        var serverMessage = { text: message, type: ServerMessageType.Message };
        this._serverMessages.push(serverMessage);
    };
    AppService.prototype.question = function (question, choices, origin, answerId) {
        //<!--Questions from the Application manager -- >
        //	$("#adminContainerRight").append($("<div>" + question + "<br>" + "</div>"));
        console.log(question);
        for (var i = 0; i < choices.length; i++) {
            //$("#adminContainerRight").append($("<div><button onclick=\"sam.answer('" + choices[i].short + "', '" + answerId + "');\">" + choices[i].screen + "</button></div>"));
            console.log("<div><button onclick=\"sam.answer('" + choices[i].short + "', '" + answerId + "');\">" + choices[i].screen + "</button></div>");
        }
    };
    AppService.prototype.questionTimedOut = function (message, origin, answerId) {
        //<!--Application manager does't wait forever answers to questions -->
        console.log(message);
    };
    AppService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AppService);
    return AppService;
}());
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map