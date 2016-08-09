import {Component, OnInit} from '@angular/core';
import {HeaderComponent } from "./header.component";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {ChatComponent} from "./chat/chat.component";
import {AuthService} from "./shared/auth.service";


@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [HeaderComponent , ROUTER_DIRECTIVES , ChatComponent]
})



export class AppComponent implements OnInit{
  constructor(private authService: AuthService){}

  ngOnInit() {

  }
}
