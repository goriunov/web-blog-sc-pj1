import {Component, OnInit} from '@angular/core';
import {HeaderComponent } from "./header.component";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {ChatComponent} from "./chat/chat.component";


@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [HeaderComponent , ROUTER_DIRECTIVES , ChatComponent]
})



export class AppComponent implements OnInit{
  constructor(){}

  ngOnInit() {

  }
}
