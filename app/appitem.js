System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var AppItem;
    return {
        setters:[],
        execute: function() {
            AppItem = (function () {
                function AppItem(name, readme, icon) {
                    this.name = name;
                    this.readme = readme;
                    this.icon = icon;
                }
                return AppItem;
            }());
            exports_1("AppItem", AppItem);
        }
    }
});
//# sourceMappingURL=appitem.js.map