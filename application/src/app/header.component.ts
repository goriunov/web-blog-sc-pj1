import { Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "./shared/auth.service";

declare var firebase:any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})


//Working program
export class HeaderComponent implements OnInit {

  //Init service
  constructor(private auth: AuthService , private router: Router){}

  //Init variable
  user : boolean;
  userName = '';
  userImg;

  // Check if user LogIn.
  checkUser(){
    var check = this.auth.currentUSer();
    if(check){
      //If user in get his name and avatar picture
      this.userName = check.displayName;
      this.userImg = check.photoURL;
      //Change content in login menu on Create articles and logOut
      this.user = true;
    }else{
      this.user = false;
    }

  }

  //Check validation and give access to some button
  ngOnInit(){}


  //click on button Login Facebook
  faceBookLogIn(){
    //Send request to Auth service
    this.auth.faceBookIn().then(
      data =>{
        this.user = true;
        console.log(this.user);
        this.router.navigate(['/content']);
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

  //Google Log in Send request to Auth service
  googleIn(){
    this.auth.googleIn().then(
      data =>{
        this.user = true;
        console.log(this.user);
        this.router.navigate(['/content']);
      },
      error=>{
        this.user = false;
      }
    );
  }

}
