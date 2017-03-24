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
var SpaceifySourceDirective = (function () {
    //private windowRef: WindowRef;
    function SpaceifySourceDirective(el /*, windowRef: WindowRef*/) {
        this.el = el.nativeElement;
        //this.windowRef = windowRef.nativeWindow;
    }
    Object.defineProperty(SpaceifySourceDirective.prototype, "spaceifySource", {
        set: function (src) {
            this.el.setAttribute("sp_src", src); // Dynamic and static, e.g. dynamic: [sp_src]="app.icon", static: sp_src="assets/icon.png"
            /*this.windowRef.*/ spaceifyLoader.loadData(this.el, {}, null);
        },
        enumerable: true,
        configurable: true
    });
    return SpaceifySourceDirective;
}());
__decorate([
    core_1.Input('sp_src'),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], SpaceifySourceDirective.prototype, "spaceifySource", null);
SpaceifySourceDirective = __decorate([
    core_1.Directive({
        selector: '[sp_src]'
    }),
    __metadata("design:paramtypes", [core_1.ElementRef /*, windowRef: WindowRef*/])
], SpaceifySourceDirective);
exports.SpaceifySourceDirective = SpaceifySourceDirective;
//# sourceMappingURL=spaceifysrc.directive.js.map