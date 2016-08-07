import { Component, OnInit , trigger, state, animate, transition, style  } from '@angular/core';
import {DropDownDirective} from "./dropdown.directive";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {AuthService} from "./shared/auth.service";

@Component({
  moduleId: module.id,
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css'],
  directives: [DropDownDirective , ROUTER_DIRECTIVES],
  animations:[
    trigger('appear' , [
      state('in' , style({opacity:'1.0'})),
      transition('fade => *', [
        style({opacity:'0.1'}),
        animate(500)
      ])
    ])
  ]
})


//Working program
export class HeaderComponent implements OnInit {
  //Init variables
  constructor(private auth: AuthService){}
  user : boolean;
  userName = '';
  userImg;

  checkUser(){
    var check = this.auth.currentUSer();
    if(check){
      this.userName = check.displayName;
      this.userImg = check.photoURL;
    }else{
      this.user = false;
    }

  }

  //Check validation and give access to some button
  ngOnInit(){
     var check = this.auth.currentUSer();
    if(check){
      this.user = true;
    }else{
      this.user = false;
    }
  }
  //click on button Login Facebook
  faceBookLogIn(){
    this.auth.faceBookIn().then(
      data =>{

        this.user = true;
        console.log(this.user);
      },
      error=>{
        this.user = false;
      }
    );
  }

  //Log out button click
  faceBookLogOut(){
    this.auth.faceBookout();
    this.user = false;
  }

  googleIn(){
    this.auth.googleIn().then(
      data =>{
        this.user = true;
        console.log(this.user);
      },
      error=>{
        this.user = false;
      }
    );

  }
}
