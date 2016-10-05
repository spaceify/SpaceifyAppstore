"use strict";
var ProvidedServiceItem = (function () {
    function ProvidedServiceItem(manifest_provides_service_object) {
        this.service_name = manifest_provides_service_object.service_name;
        this.service_type = manifest_provides_service_object.service_type;
    }
    return ProvidedServiceItem;
}());
exports.ProvidedServiceItem = ProvidedServiceItem;
//export interface 
//# sourceMappingURL=providedserviceitem.js.map