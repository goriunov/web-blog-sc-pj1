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
var forms_1 = require("@angular/forms");
var content_service_1 = require("../content.service");
var router_1 = require("@angular/router");
var EditContentComponent = (function () {
    // Find id route from link
    function EditContentComponent(contService, activeRote, router) {
        var _this = this;
        this.contService = contService;
        this.activeRote = activeRote;
        this.router = router;
        this.sections = ['Networking', 'WebDev', 'Software', 'MobileDev', 'DataBase'];
        this.subscription = this.activeRote.params.subscribe(function (param) {
            _this.id = param['id'];
            _this.selectedContent = _this.contService.getSingleContent(+_this.id);
        });
    }
    // Add Section IN form and remove it
    EditContentComponent.prototype.onSelect = function (section) {
        this.myForm.find('sections').push(new forms_1.FormControl(section, forms_1.Validators.required));
        this.sections.splice(this.sections.indexOf(section), 1);
    };
    EditContentComponent.prototype.onUnSelect = function (section) {
        this.sections.push(this.myForm.find('sections').controls[section].value);
        this.myForm.find('sections').removeAt(section);
    };
    ///////////////
    EditContentComponent.prototype.ngOnInit = function () {
        // Third package
        CKEDITOR.replace('editor1');
        //...................
        var header = '';
        var description = '';
        var imgUrl = '';
        this.article = '';
        this.sectionsForm = [];
        // if we have edited form  will take values
        if (this.id) {
            header = this.selectedContent.header;
            description = this.selectedContent.description;
            imgUrl = this.selectedContent.imgUrl;
            this.article = this.selectedContent.article;
            for (var i = 0; i < this.selectedContent.sections.length; i++) {
                this.sectionsForm.push(new forms_1.FormControl(this.selectedContent.sections[i], forms_1.Validators.required));
                this.sections.splice(this.sections.indexOf(this.selectedContent.sections[i]), 1);
            }
        }
        //Init form
        this.myForm = new forms_1.FormGroup({
            'header': new forms_1.FormControl(header, forms_1.Validators.required),
            'description': new forms_1.FormControl(description, forms_1.Validators.required),
            'imgUrl': new forms_1.FormControl(imgUrl, forms_1.Validators.required),
            'authorName': new forms_1.FormControl('Author', forms_1.Validators.required),
            'article': new forms_1.FormControl(this.article),
            'sections': new forms_1.FormArray(this.sectionsForm)
        });
    };
    // submit  form
    EditContentComponent.prototype.onSubmit = function () {
        var x = CKEDITOR.instances['editor1'].getData();
        this.article = x;
        // form which will be submitted (other wise can not get CKEditor value properly)
        var submitingForm = new forms_1.FormGroup({
            'header': new forms_1.FormControl('' + this.myForm.find('header').value),
            'description': new forms_1.FormControl('' + this.myForm.find('description').value),
            'imgUrl': new forms_1.FormControl('' + this.myForm.find('imgUrl').value),
            'authorName': new forms_1.FormControl('Author NAME'),
            'article': new forms_1.FormControl(this.article),
            'sections': new forms_1.FormArray(this.sectionsForm)
        });
        ///////////
        if (this.id) {
            var newArticle = submitingForm.value;
            this.contService.editContent(+this.id, newArticle);
        }
        else {
            var newArticle = submitingForm.value;
            this.contService.addContent(newArticle);
        }
        this.router.navigate(['/content/all', this.id ? this.id : '']);
    };
    EditContentComponent.prototype.onCancel = function () {
        this.router.navigate(['/content']);
    };
    // Un subscribe from observable
    EditContentComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    EditContentComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-edit-content',
            templateUrl: 'edit-content.component.html',
            styleUrls: ['edit-content.component.css'],
            directives: [forms_1.REACTIVE_FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [content_service_1.ContentService, router_1.ActivatedRoute, router_1.Router])
    ], EditContentComponent);
    return EditContentComponent;
}());
exports.EditContentComponent = EditContentComponent;
//# sourceMappingURL=edit-content.component.js.map