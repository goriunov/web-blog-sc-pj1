"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var core_1 = require('@angular/core');
var _1 = require('./app/');
var app_route_1 = require("./app/app.route");
var content_service_1 = require("./app/content/content.service");
var forms_1 = require("@angular/forms");
if (_1.environment.production) {
    core_1.enableProdMode();
}
platform_browser_dynamic_1.bootstrap(_1.AppComponent, [
    app_route_1.APP_ROUTER_PROVIDER,
    content_service_1.ContentService,
    forms_1.disableDeprecatedForms(),
    forms_1.provideForms()
]);
//# sourceMappingURL=main.js.map