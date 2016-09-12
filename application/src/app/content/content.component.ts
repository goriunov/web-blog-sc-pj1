import { Component, OnInit ,OnDestroy  } from '@angular/core';
import {ContentService} from "../content/content.service";
import {Content} from "../shared/content";
import {ActivatedRoute} from '@angular/router';
import {Subscription} from "rxjs/Rx";
import {NameService} from "../name.service";


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
})

export class ContentComponent implements OnInit , OnDestroy{

  //Init main Variable
  private subscription: Subscription;
  articles : Content[] = []; //Main Front end Massive
  helper: Content [] = []; // get data from service and help do not get error 'section undefined'
  private id: string;
  noArticles: number = 0;
  counter = 0;
  private loadingData = true;


  private gotData = false;
  filter: string;
  // Get  param of page and check filter in
  constructor(private contentService : ContentService ,
              private activatedRouter: ActivatedRoute,
              private nameService: NameService) {
    this.subscription = this.activatedRouter.params.subscribe(
      (param : any) => {
        this.id = param['section'];
        this.filter = this.id;//does not work this function
        if(this.counter !=0) {
          this.ngOnInit(0);
        }
      }
    );
  }

  // Init all app
  ngOnInit(number?: number) {
    this.nameService.changeName('Reading');
    //getting Data
    this.articles = [];
    this.loadingData = true;
    this.contentService.getContentfromDB(number).subscribe(
      data=> {
        this.noArticles = 0;
        this.loadingData = true;
        this.helper = data;
        this.articles = [];
        if (this.helper != null) {
          for (let i = 0; i < this.helper.length; i++) {
            this.articles.push(this.helper[i]);
            if(i == this.helper.length - 1){
              this.loadingData = false;
            }
          }


          //Filter function  , divide on different areas
          if (this.articles.length > 0 ) {
            if (this.id != 'all' && this.id != null) {
              this.noArticles = 1;
              for (let i = 0; i < this.articles.length; i++) {
                var b: number = 0;
                for (let j = 0; j < this.articles[i].sections.length; j++) {
                  if (this.articles[i].sections[j] == this.id) {
                    b = b + 1;

                    this.loadingData = false;
                  }
                }
                if (b < 1) {
                  this.articles[i] = null;
                }else{
                  this.noArticles = 0;
                }
              }
            }
          }
        }else{
          this.articles = data;
          this.loadingData = false;
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
