import { Component, OnInit , OnDestroy , trigger, state, animate, transition, style } from '@angular/core';
import {FormGroup, FormControl, FormArray, REACTIVE_FORM_DIRECTIVES, Validators} from "@angular/forms";
import {ContentService} from "../content.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription, Observable} from "rxjs/Rx";
import {Content} from "../../shared/content";
import {AuthService} from "../../shared/auth.service";

// Editor declared

declare var CKEDITOR: any;

@Component({
  moduleId: module.id,
  selector: 'app-edit-content',
  templateUrl: 'edit-content.component.html',
  styleUrls: ['edit-content.component.css'],
  directives: [REACTIVE_FORM_DIRECTIVES],

})


export class EditContentComponent implements OnInit , OnDestroy {
  //Init variables
  areYouIn="";
  clicked = false;
  private subscription: Subscription;
  private id: string; //ID of page ass well use for get data from array
  private selectedContent: Content; // actual data from array
  shadow = true;//Do not permit load page if data is not get yet
  auth= false;//Do not permit load page if you are not authorize
  myForm : FormGroup;//actual form
  sections : string[]= ['Technology' , 'Programming','Anime' ,'Comics' ,'Serials' ,'Films' ,'Games' , 'Other'];


// Find id route from link
  constructor(private contService : ContentService ,
              private activeRote : ActivatedRoute,
              private router: Router,
              private authService: AuthService) {
    this.subscription = this.activeRote.params.subscribe(
      (param: any) => {
        this.id = param['id'];
        console.log(this.id);
        if(this.id != null) {
          this.shadow = false;
          this.selectedContent = this.contService.getSingleContent(+this.id);
          if(this.selectedContent){
            this.shadow = true;
          }else{
            this.router.navigate(['content']);
          }
        }
      })};


// Add Sections in form
  onSelect(section){
    (<FormArray>this.myForm.find('sections')).push(new FormControl(section , [Validators.required , atListOne]));
    this.sections.splice(this.sections.indexOf(section), 1);
  }

//Remove sections from form
  onUnSelect(section){
    this.sections.push((<FormArray>this.myForm.find('sections')).controls[section].value);
    (<FormArray>this.myForm.find('sections')).removeAt(section);
  }


/// Use for transver data from editor to form
   article :string = '';
   sectionsForm : any[]= [];
///////////////


  ngOnInit() {
    //Check if user sign in
    var user = this.authService.currentUSer();

    if(user) {
      this.auth= true;
      // Third package
      if (this.shadow) {
        CKEDITOR.replace('editor1');
      }
      this.contService.getContentfromDB();
      //...................

      var header = '';
      var description = '';
      var imgUrl = '';
      this.article = '';
      this.sectionsForm = [];
      // if we have edited form  will take values
      //Getting Value
      if (this.id != null && this.shadow) {
      if(user.email != this.selectedContent.email && user.email != 'goriunovd@gmail.com' ){
        this.router.navigate(['content']);
      }
        header = this.selectedContent.header;
        description = this.selectedContent.description;
        imgUrl = this.selectedContent.imgUrl;
        this.article = this.selectedContent.article;

        for (let i = 0; i < this.selectedContent.sections.length; i++) {
          this.sectionsForm.push(new FormControl(this.selectedContent.sections[i], [Validators.required, atListOne]));
          this.sections.splice(this.sections.indexOf(this.selectedContent.sections[i]), 1);
        }
      }
      //Init real form
      this.myForm = new FormGroup({
        'header': new FormControl(header, [Validators.required, hasLessThen]),
        'description': new FormControl(description, [Validators.required]),
        'imgUrl': new FormControl(imgUrl, Validators.required),
        'authorName': new FormControl('Author', Validators.required),
        'article': new FormControl(this.article),
        'sections': new FormArray(this.sectionsForm, Validators.compose([
          Validators.required,
          atListOne
        ]))
      });
    }else{
      this.auth= false;
      this.router.navigate(['content/all']);
    }
    }


// Submit  form
  onSubmit(){
// Check user Auth access

    let user = this.authService.currentUSer();
    if(user) {
      this.clicked = true;
      //Get data from editor
      var x = CKEDITOR.instances['editor1'].getData();
      this.article = x;
// Form which will be submitted (other wise can not get CKEditor value properly)
      const submitingForm = new FormGroup({
        'header': new FormControl('' + this.myForm.find('header').value),
        'description': new FormControl('' + this.myForm.find('description').value),
        'imgUrl': new FormControl('' + this.myForm.find('imgUrl').value),
        'authorName': new FormControl('Author NAME'),
        'article': new FormControl(this.article),
        'sections': new FormArray(this.sectionsForm)
      });
///////////
//Check  if you edit or create new
      if (this.id != null) {
        //save data
        var newArticle = submitingForm.value;
        newArticle = this.contService.editContent(+this.id, newArticle);
        this.contService.saveContent(newArticle, 'edit').subscribe(
          (response: any) => {
            console.log(response);
            this.router.navigate(['/content/all']);
          },
          err => console.log(err));


      }else{
        //save data
        var newArticle = submitingForm.value;
        this.contService.addContent(newArticle);
        this.contService.saveContent(newArticle, 'save').subscribe(
          (response: any) => {
            console.log(response);
            this.router.navigate(['/content/all']);
          },
          err => console.log(err));
      }
    }else{
      this.areYouIn =' You are not authorized for saving articles';
      console.log('Not authorized');
    }
  }


//Button cancel to navigate on another content
  onCancel(){
    this.router.navigate(['/content' ]);
  }

// Un subscribe from observable
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}





//Function for Validation has some value in Sections
function atListOne(control: FormArray) :  {[s:string]:boolean}{
  if(control.length < 1){
    return {name: true};
  }
}

//Does not have less then need letters
function hasLessThen(control: FormControl):{[s:string]:boolean}{
  if(control.value.length > 150 || control.value.length < 5 ){
    return {name: true};
  }
}



