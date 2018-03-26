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
var ContextbarComponent = (function () {
    function ContextbarComponent() {
        this.searchEnabled = false;
        this.searchEvent = new core_1.EventEmitter();
        if (typeof (SpaceifyNet) === "function")
            this.net = new SpaceifyNet();
    }
    ContextbarComponent.prototype.doSearch = function (searchString) {
        this.searchEvent.emit({
            value: searchString
        });
    };
    ContextbarComponent.prototype.loadHomepage = function () {
        this.net.loadHomepage();
    };
    return ContextbarComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], ContextbarComponent.prototype, "searchEnabled", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], ContextbarComponent.prototype, "searchEvent", void 0);
ContextbarComponent = __decorate([
    core_1.Component({
        selector: 'contextbar',
        //pipes: [AppFilterPipe],
        //templateUrl: 'appstore/app/app.component.html',
        //styleUrls: [ 'appstore/app/app.component.css' ],
        //directives: [ROUTER_DIRECTIVES]
        template: "<nav class=\"menu_container\">\n\t\t<!--<a class=\"menu_topic\" routerLink=\"/homepage\" routerLinkActive=\"navActive\">HOMEPAGE</a>-->\n\t\t<a class=\"menu_topic\" (click)=\"loadHomepage()\" style=\"cursor: pointer;\">HOMEPAGE</a>\n\t\t<a class=\"menu_topic\" routerLink=\"/install\" routerLinkActive=\"navActive\">STORE</a>\n\t\t<a class=\"menu_topic\" routerLink=\"/manage\" routerLinkActive=\"navActive\">INSTALLED APPLICATIONS</a>\n\n\t\t<div *ngIf='searchEnabled' id=\"search_bar\" class=\"search_bar\">\n\t\t\t<input type=\"search\" id=\"search\" placeholder=\"Search\" #search (keyup.enter)=\"doSearch(search.value)\">\n\t\t</div>\n\n\t\t<br class=\"menu_clear\" />\n\t\t</nav>",
    }),
    __metadata("design:paramtypes", [])
], ContextbarComponent);
exports.ContextbarComponent = ContextbarComponent;
//# sourceMappingURL=contextbar.component.js.map