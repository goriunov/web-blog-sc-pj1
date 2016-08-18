//Content service
import { Injectable , EventEmitter} from '@angular/core';
import {Content} from "../shared/content";
import {Headers, Http} from "@angular/http";
import {Observable} from "rxjs";
import {_catch} from "rxjs/operator/catch";
//Declare firebase
declare var firebase:any;

@Injectable()

export class ContentService {

  constructor(private http: Http){
  }

  //Init main variable
  user: any;
  private start  = 0;
  private articles: Content[] = []; //App Work with this massive Front end

  // Get data from Data Base Fire base
  getContentfromDB(start?:number){
    if(start > 0){
      this.start  = this.start + 9;
    }
    //Check if we want to over go article and run loop
    if(start != 0 && this.articles.length < 9){
      this.start = 0;
    }
    //Actually getting content from DB
    return this.http.get('/data/'+ this.start)
      .map(response => {
       const data = response.json().obj;
        if(data != null) {
          this.articles = data;
        }
        return this.articles;
      });
  }

  //Get Single Content currently using for get in in EDIT
  getSingleContent(id: number){
    return this.articles[id];
  }


  //Add content in main Massive FrontEnd
  addContent(content: Content){
    content.authorName = firebase.auth().currentUser.displayName;
    content.email = firebase.auth().currentUser.email;
    this.articles.push(content);
  }


  //Renew content in Helper Massive Back end massive
  editContent(oldArticleID: number, newArticle: Content){
    var id = this.articles[oldArticleID].id;
    newArticle.authorName = firebase.auth().currentUser.displayName;// get name of author
    newArticle.email = firebase.auth().currentUser.email;//Get email and send massage with email , give access to sort
    this.articles[oldArticleID] = newArticle;
    this.articles[oldArticleID].id = id;
    return this.articles[oldArticleID];

  }

  //Only for admin I can Delete)))
  deleteContent(ArticleID: number){
    this.saveContent(this.articles[ArticleID] , 'delete').subscribe(
      data => this.getContentfromDB().subscribe(
        data => console.log('Data in work'),
        error => console.log(error)
      ),
      error=>console.log('Error')
    )
  }

  //Save Content in DataBase use Helper as a database massive
  saveContent(article: Content , act: string ){
    this.start = 0;
    if(act == 'save'){
      article.id = 0;
    }
    const body = JSON.stringify(article);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('/data/' + act , body , {headers: headers})
      .map(response => response.json());

  }
}


