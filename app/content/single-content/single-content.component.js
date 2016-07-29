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
var router_1 = require("@angular/router");
var content_service_1 = require("../content.service");
var router_2 = require('@angular/router');
var SingleContentComponent = (function () {
    function SingleContentComponent(activatedRoute, contentService) {
        this.activatedRoute = activatedRoute;
        this.contentService = contentService;
    }
    SingleContentComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.activatedRoute.params.subscribe(function (param) {
            _this.sectionParam = param['section'];
            _this.id = param['id'];
            _this.article = _this.contentService.getSingleContent(+_this.id);
        });
    };
    SingleContentComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    SingleContentComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-single-content',
            templateUrl: 'single-content.component.html',
            styleUrls: ['single-content.component.css'],
            directives: [router_2.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, content_service_1.ContentService])
    ], SingleContentComponent);
    return SingleContentComponent;
}());
exports.SingleContentComponent = SingleContentComponent;
//# sourceMappingURL=single-content.component.js.map