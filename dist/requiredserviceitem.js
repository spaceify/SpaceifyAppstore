"use strict";
var RequiredServiceItem = (function () {
    function RequiredServiceItem(manifest_requires_service_object) {
        this.service_name = manifest_requires_service_object.service_name;
        this.suggested_application = manifest_requires_service_object.suggested_application;
        this.suggested_description = manifest_requires_service_object.suggested_description;
    }
    return RequiredServiceItem;
}());
exports.RequiredServiceItem = RequiredServiceItem;
//export interface 
//# sourceMappingURL=requiredserviceitem.js.map