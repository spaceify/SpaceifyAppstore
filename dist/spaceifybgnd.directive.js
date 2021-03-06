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
var SpaceifyBgndDirective = (function () {
    function SpaceifyBgndDirective(el) {
        this.el = el.nativeElement;
    }
    Object.defineProperty(SpaceifyBgndDirective.prototype, "spaceifyBgnd", {
        set: function (src) {
            this.el.setAttribute("sp_bgnd", src); // Dynamic and static, e.g. dynamic: [sp_src]="app.icon", static: sp_src="assets/images/icon.png"
            spaceifyLoader.loadData(this.el, null);
        },
        enumerable: true,
        configurable: true
    });
    return SpaceifyBgndDirective;
}());
__decorate([
    core_1.Input('sp_bgnd'),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], SpaceifyBgndDirective.prototype, "spaceifyBgnd", null);
SpaceifyBgndDirective = __decorate([
    core_1.Directive({
        selector: '[sp_bgnd]'
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], SpaceifyBgndDirective);
exports.SpaceifyBgndDirective = SpaceifyBgndDirective;
//# sourceMappingURL=spaceifybgnd.directive.js.map