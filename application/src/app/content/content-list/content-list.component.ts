import { Component, OnInit , Input  , OnDestroy , trigger, state, animate, transition, style } from '@angular/core';
import {Content} from "../../shared/content";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs/Rx";
import {ContentService} from "../content.service";
import {AuthService} from "../../shared/auth.service";

@Component({
  selector: 'app-content-list',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.css'],
  animations: [
    trigger('flyIn' , [
      state('in' , style({
              transform: 'translateY(0)',
              opacity: '1.0'})),
      transition('void => *' , [
       style({
            transform: 'translateY(-80%)' ,
            opacity: '0.3' }),
        animate('400ms ease-in')

      ]),
      transition('* => void' , [
        animate(1000 , style({transform: 'translateX(100%)'}))
      ])
    ])
  ]
})
export class ContentListComponent implements OnInit , OnDestroy {
  //Init variables
  @Input() article : Content;
  @Input() index: number;
  //Init working variables
  some = false;// Strange name but i use it for Panel with button edit and article (
  isAuthorize= false;
  addStyle = false;
  isAuthorizeAdmin = false;
  sections: string = 'all';
  private sectionParam: string;
  private subscription :Subscription;


  //Get Param
  constructor(private contentService: ContentService,
              private activatedRouter : ActivatedRoute,
              private authService: AuthService) {}
  ngOnInit() {
    this.subscription = this.activatedRouter.params.subscribe(
      (param: any) =>{
       this.sectionParam = param['section'];
      });
  }
  /////////////////////////////////

  //Button on delete
  onDelete(){
    this.contentService.deleteContent(this.index);
  }

  //Button on Open content
  onOpen(){
    this.isAuthorizeAdmin = false;
    //check if user authorize
    var check = this.authService.currentUSer();
    //if yes then open panel for Edit
    if(check){
      if( check.email == 'goriunovd@gmail.com'){
        this.isAuthorizeAdmin = true;
        console.log(this.article.email);
      }

      if(check.email == this.article.email || check.email == 'goriunovd@gmail.com') {
        this.isAuthorize = true;
      }
      //if not then do not permit enter
    }else{
      this.isAuthorize = false;
    }
    //Open text and Close it
    if(this.some ==false){
      this.some = true;
      this.addStyle = true;
    }else{
      this.some  = false;
      this.addStyle = false;
    }
  }


  //Un subscribe
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
