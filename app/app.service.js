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
        this.http = http;
    }
    AppService.prototype.getManifests = function () {
        // return an observable
        return this.http.get('app/mock-data.json')
            .map(this.extractData)
            .map(this.mapData)
            .catch(this.handleError);
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