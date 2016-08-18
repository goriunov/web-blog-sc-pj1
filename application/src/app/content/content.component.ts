import { Component, OnInit ,OnDestroy  } from '@angular/core';
import {ContentListComponent} from "./content-list/content-list.component";
import {EditContentComponent} from "./edit-content/edit-content.component";
import {ContentService} from "../content/content.service";
import {Content} from "../shared/content";
import {ActivatedRoute, ROUTER_DIRECTIVES} from '@angular/router';
import {Subscription} from "rxjs/Rx";


@Component({
  moduleId: module.id,
  selector: 'app-content',
  templateUrl: 'content.component.html',
  styleUrls: ['content.component.css'],
  directives: [ContentListComponent , EditContentComponent , ROUTER_DIRECTIVES],
})

export class ContentComponent implements OnInit , OnDestroy{

  //Init main Variable
  private subscription: Subscription;
  articles : Content[] = []; //Main Front end Massive
  helper: Content [] = []; // get data from service and help do not get error 'section undefined'
  private id: string;
  counter = 0;


  private gotData = false;
  filter: string;
  // Get  param of page and check filter in
  constructor(private contentService : ContentService ,
              private activatedRouter: ActivatedRoute) {
    this.subscription = this.activatedRouter.params.subscribe(
      (param : any) => {
        this.id = param['section'];
        this.filter = this.id;//does not work this function
        console.log(param);
        if(this.counter !=0) {
          this.ngOnInit();
        }
      }
    );
  }

  // Init all app
  ngOnInit(number?: number) {
    //getting Data
    this.articles = [];
    this.contentService.getContentfromDB(number).subscribe(
      data=> {
        this.helper = data;
        this.articles = [];
        if (this.helper != null) {
          for (let i = 0; i < this.helper.length; i++) {
            this.articles.push(this.helper[i]);
          }

          //Filter function  , divide on different areas
          if (this.articles.length > 0) {
            if (this.id != 'all' && this.id != null) {
              for (let i = 0; i < this.articles.length; i++) {
                var b: number = 0;
                for (let j = 0; j < this.articles[i].sections.length; j++) {
                  if (this.articles[i].sections[j] == this.id) {
                    b = b + 1;
                  }
                }
                if (b < 1) {
                  this.articles[i] = null;
                }
              }
            }
          }
        }else{
          this.articles = data;
        }
      }

    );
    this.counter = 1;
  }

  //Change page if we have enough articles
  onNext(){
    this.ngOnInit(10);
  }

  //Un subscribe
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
