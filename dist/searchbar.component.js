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
var SearchbarComponent = (function () {
    function SearchbarComponent() {
        this.searchEvent = new core_1.EventEmitter();
    }
    SearchbarComponent.prototype.doSearch = function (searchString) {
        this.searchEvent.emit({
            value: searchString
        });
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SearchbarComponent.prototype, "searchEvent", void 0);
    SearchbarComponent = __decorate([
        core_1.Component({
            selector: 'searchbar',
            //pipes: [AppFilterPipe],
            //templateUrl: 'app/app.component.html',
            //styleUrls: [ 'app/app.component.css' ],
            //directives: [ROUTER_DIRECTIVES]
            template: "<div id=\"search_bar\" class=\"search_bar\">\n    <input type=\"search\" id=\"search\" placeholder=\"Search\" #search (keyup.enter)=\"doSearch(search.value)\">\n    </div>\n    <br class=\"menu_clear\" />",
        }), 
        __metadata('design:paramtypes', [])
    ], SearchbarComponent);
    return SearchbarComponent;
}());
exports.SearchbarComponent = SearchbarComponent;
//# sourceMappingURL=searchbar.component.js.map