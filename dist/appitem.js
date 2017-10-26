"use strict";
var developeritem_1 = require("./developeritem");
var imageitem_1 = require("./imageitem");
var providedserviceitem_1 = require("./providedserviceitem");
var requiredserviceitem_1 = require("./requiredserviceitem");
var AppItem = (function () {
    function AppItem(manifest) {
        this.dateSplitter = /[ :-]/;
        if (typeof (SpaceifyConfig) === "function") {
            this.config = new SpaceifyConfig();
            this.config.initialize("");
        }
        if (typeof (SpaceifyUtility) === "function")
            this.utility = new SpaceifyUtility();
        if (typeof (SpaceifyNetwork) === "function")
            this.network = new SpaceifyNetwork();
        this.provides_services = [];
        if (manifest.hasOwnProperty('provides_services')) {
            for (var _i = 0, _a = manifest.provides_services; _i < _a.length; _i++) {
                var item = _a[_i];
                this.provides_services.push(new providedserviceitem_1.ProvidedServiceItem(item));
            }
        }
        this.requires_services = [];
        if (manifest.hasOwnProperty('requires_services')) {
            for (var _b = 0, _c = manifest.requires_services; _b < _c.length; _b++) {
                var item = _c[_b];
                this.requires_services.push(new requiredserviceitem_1.RequiredServiceItem(item));
            }
        }
        this.name = manifest.name;
        this.unique_name = manifest.unique_name;
        this.version = manifest.version;
        this.type = manifest.type;
        this.category = manifest.category;
        this.start_command = manifest.start_command;
        this.developer = new developeritem_1.DeveloperItem(manifest.developer);
        this.short_description = manifest.short_description;
        if (manifest.hasOwnProperty('appstore_description')) {
            this.appstore_description = manifest.appstore_description;
        }
        this.license = manifest.license;
        this.creation_date = this.getManifestDate(manifest.creation_date);
        this.implements = manifest.implements;
        this.images = [];
        if (manifest.hasOwnProperty('images')) {
            for (var _d = 0, _e = manifest.images; _d < _e.length; _d++) {
                var item = _e[_d];
                this.images.push(new imageitem_1.ImageItem(item));
            }
        }
        this.unique_directory = manifest.unique_directory;
        if (typeof manifest.icon == "undefined") {
            this.aicon = this.utility.getApplicationIcon(manifest, true);
            if (this.aicon)
                this.icon = this.network.getEdgeURL({ forceSecureProtocol: true, withEndSlash: true }) + this.unique_name + this.aicon;
            else
                this.icon = "assets/images/default_icon-128p.png";
        }
        else
            this.icon = window.location.protocol + this.config.get("EDGE_GET_RESOURCE_URL") + encodeURIComponent(manifest.icon);
        this.version_canonical = manifest.version_canonical;
        this.publish_date = this.getManifestDate(manifest.publish_date);
        this.readme = manifest.readme;
        this.versions = manifest.versions;
        this.canonical_versions = manifest.canonical_versions;
        if (manifest.hasOwnProperty('isInstalled'))
            this.isInstalled = manifest.isInstalled;
        else
            this.isInstalled = false;
        if (manifest.hasOwnProperty('isRunning'))
            this.isRunning = manifest.isRunning;
        else
            this.isRunning = false;
        this.updateAvailable = false;
    }
    AppItem.prototype.getManifestDate = function (date) {
        var dateParts, mdate = null;
        if (date) {
            dateParts = date.split(this.dateSplitter);
            if (dateParts.length == 6)
                mdate = new Date(+dateParts[0], +dateParts[1], +dateParts[2], +dateParts[3], +dateParts[4], +dateParts[5], 0);
        }
        return mdate;
    };
    return AppItem;
}());
exports.AppItem = AppItem;
//export interface 
//# sourceMappingURL=appitem.js.map