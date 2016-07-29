"use strict";
var router_1 = require("@angular/router");
var content_component_1 = require("./content/content.component");
var single_content_component_1 = require("./content/single-content/single-content.component");
var edit_content_component_1 = require("./content/edit-content/edit-content.component");
;
exports.APP_ROUTER_PROVIDER = [
    router_1.provideRouter([
        { path: '', redirectTo: 'content', pathMatch: 'full' },
        { path: 'content', component: content_component_1.ContentComponent },
        { path: 'content/:section', component: content_component_1.ContentComponent },
        { path: 'content/:section/:id', component: single_content_component_1.SingleContentComponent },
        { path: 'create-post', component: edit_content_component_1.EditContentComponent },
        { path: 'edit/:id', component: edit_content_component_1.EditContentComponent }
    ])
];
//# sourceMappingURL=app.route.js.map