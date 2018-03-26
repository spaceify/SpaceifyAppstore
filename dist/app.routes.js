"use strict";
var router_1 = require("@angular/router");
var homepage_component_1 = require("./homepage.component");
var manage_component_1 = require("./manage.component");
var manageapp_component_1 = require("./manageapp.component");
var install_component_1 = require("./install.component");
var installapp_component_1 = require("./installapp.component");
var intro_1 = require("./intro");
var _404_1 = require("./404");
var routes = [
    {
        path: 'manage/:unique_name',
        component: manageapp_component_1.ManageAppComponent
    },
    {
        path: 'homepage',
        component: homepage_component_1.HomepageComponent
    },
    {
        path: 'manage',
        component: manage_component_1.ManageComponent
    },
    {
        path: 'install/:unique_name',
        component: installapp_component_1.InstallAppComponent
    },
    {
        path: 'install',
        component: install_component_1.InstallComponent
    },
    {
        path: 'intro',
        component: intro_1.IntroComponent
    },
    {
        path: '',
        redirectTo: '/intro',
        pathMatch: 'full'
    },
    { path: '**', component: _404_1.PageNotFoundComponent },
];
exports.routing = router_1.RouterModule.forRoot(routes, { useHash: true });
//# sourceMappingURL=app.routes.js.map