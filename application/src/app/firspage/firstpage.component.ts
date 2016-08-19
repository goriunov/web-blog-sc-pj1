import {Component} from '@angular/core';
import {AuthService} from "../shared/auth.service";
import {Router} from "@angular/router";

@Component({
      moduleId: module.id,
      selector: 'my-first-page',
      templateUrl: 'firstpage.template.html',
      styleUrls: ['firstpage.css']
})

export class FirstPageComponent{
  constructor(private auth: AuthService  , private router: Router){}

  //click on button Login Facebook
  faceBookLogIn(){
    //Send request to Auth service
    this.auth.faceBookIn().then(
      data =>{
        this.router.navigate(['/content']);
      },
      error=>{
      }
    );
  }

  //Google Log in Send request to Auth service
  googleIn(){
    this.auth.googleIn().then(
      data =>{
        this.router.navigate(['/content']);
      },
      error=>{
      }
    );
  }

}
