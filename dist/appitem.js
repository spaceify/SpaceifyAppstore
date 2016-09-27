"use strict";
var AppItem = (function () {
    function AppItem(manifest) {
        this.name = manifest.name;
        this.unique_name = manifest.unique_name;
        this.readme = manifest.readme;
        this.icon = manifest.icon;
        this.short_description = manifest.short_description;
        this.isRunning = manifest.isRunning;
        this.version_canonical = manifest.version_canonical;
        this.updateAvailable = false;
        //console.log("");
    }
    return AppItem;
}());
exports.AppItem = AppItem;
//export interface 
//# sourceMappingURL=appitem.js.map