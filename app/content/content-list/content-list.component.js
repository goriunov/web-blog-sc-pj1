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
var core_1 = require('@angular/core');
var content_1 = require("../../shared/content");
var router_1 = require("@angular/router");
var ContentListComponent = (function () {
    function ContentListComponent(router, activetedRouter) {
        this.router = router;
        this.activetedRouter = activetedRouter;
        this.sections = 'all';
    }
    ContentListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.activetedRouter.params.subscribe(function (param) {
            _this.sectionParam = param['section'];
        });
    };
    ContentListComponent.prototype.selectedItem = function () {
        this.router.navigate(['/content', this.sectionParam ? this.sectionParam : 'all', this.index]);
    };
    ContentListComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', content_1.Content)
    ], ContentListComponent.prototype, "article", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], ContentListComponent.prototype, "index", void 0);
    ContentListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-content-list',
            templateUrl: 'content-list.component.html',
            styleUrls: ['content-list.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute])
    ], ContentListComponent);
    return ContentListComponent;
}());
exports.ContentListComponent = ContentListComponent;
//# sourceMappingURL=content-list.component.js.map