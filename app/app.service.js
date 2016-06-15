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
var Rx_1 = require('rxjs/Rx');
var AppService = (function () {
    function AppService(http) {
        var _this = this;
        this.http = http;
        this.appStoreApps = [];
        this.installedApps = [];
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
        this.sam.appStoreGetPackages({ "where": where, "order": order, "page": page, "pageSize": pageSize }, function (err, result) {
            for (var _i = 0, _a = result.spacelet; _i < _a.length; _i++) {
                var app = _a[_i];
                _this.appStoreApps.push(new appitem_1.AppItem(app.name, app.unique_name, app.readme, app.icon));
            }
            for (var _b = 0, _c = result.sandboxed; _b < _c.length; _b++) {
                var app = _c[_b];
                _this.appStoreApps.push(new appitem_1.AppItem(app.name, app.unique_name, app.readme, app.icon));
            }
        });
        this.updateInstalledApplicationsList();
        //this.sam.appStoreGetPackages(search, this.results);
    }
    AppService.prototype.getManifests = function () {
        // return an observable
        return this.http.get('app/mock-data.json')
            .map(this.extractData)
            .map(this.mapData)
            .catch(this.handleError);
    };
    AppService.prototype.updateInstalledApplicationsList = function () {
        var _this = this;
        this.installedApps = [];
        var types = [this.config.SPACELET, this.config.SANDBOXED /*, config.NATIVE*/];
        this.sam.getApplications(types, this, function (apps) {
            console.log(apps);
            for (var _i = 0, _a = apps.spacelet; _i < _a.length; _i++) {
                var app = _a[_i];
                _this.installedApps.push(new appitem_1.AppItem(app.name, app.unique_name, app.readme, app.icon));
            }
            for (var _b = 0, _c = apps.sandboxed; _b < _c.length; _b++) {
                var app = _c[_b];
                _this.installedApps.push(new appitem_1.AppItem(app.name, app.unique_name, app.readme, app.icon));
            }
        });
    };
    AppService.prototype.getAppsStoreApps = function () {
        return this.appStoreApps;
    };
    AppService.prototype.getInstalledApps = function () {
        return this.installedApps;
    };
    AppService.prototype.installApp = function (unique_name) {
        var _this = this;
        this.sam.installApplication(unique_name, "", "", this, function () { _this.updateInstalledApplicationsList(); });
    };
    AppService.prototype.uninstallApp = function (unique_name) {
        var _this = this;
        this.sam.removeApplication(unique_name, this, function () { _this.updateInstalledApplicationsList(); });
    };
    /*
        applicationStopped() =
        applicationStarted() =
        applicationRestarted() =*/
    AppService.prototype.applicationRemoved = function (result) {
        console.log(result);
        this.updateInstalledApplicationsList();
    };
    AppService.prototype.applicationInstalled = function (result) {
        console.log(result);
        this.updateInstalledApplicationsList();
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
            for (var _a = 0, _b = err.message; _a < _b.length; _a++) {
                var message = _b[_a];
                console.log(message);
            }
        }
    };
    AppService.prototype.warning = function (message, code) {
        console.log(message);
    };
    AppService.prototype.notify = function (message, code) {
        //$("#adminContainerRight").append($("<div style='color: #32af32;'><br>" + message + "<br></div>"));
        console.log(message);
    };
    AppService.prototype.message = function (message) {
        //<!--General messages from the Application manager -- >
        //	$("#adminContainerRight").append($("<div>" + (message != "" ? message : "<br>") + "</div>"));
        console.log(message);
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
        console.log("<div>" + message + "</div>");
    };
    AppService.prototype.extractData = function (res) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        var body = res.json();
        console.log(body);
        //var app =
        return body || {};
    };
    AppService.prototype.mapData = function (apps) {
        var result = [];
        console.log(apps);
        if (apps) {
            apps.forEach(function (app) {
                result.push(new appitem_1.AppItem(app.name, app.readme, app.icon));
            });
        }
        return result;
    };
    AppService.prototype.handleError = function (error) {
        // In a real world app we might send the error to remote logging infrastructure
        var errMsg = error.message || 'Server error';
        console.error(errMsg);
        return Rx_1.Observable.throw(errMsg);
    };
    AppService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AppService);
    return AppService;
}());
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map