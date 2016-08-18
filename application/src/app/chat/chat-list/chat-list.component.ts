import {Component, OnInit, Input  } from '@angular/core';
import {Message} from "../../shared/message";

@Component({
  moduleId: module.id,
  selector: 'app-chat-list',
  templateUrl: 'chat-list.component.html',
  styleUrls: ['chat-list.component.css']
})
export class ChatListComponent implements OnInit{
  //inputs forom top component ChatComponent
  @Input() message : Message;
  @Input() index :number;
  @Input() userEmail : string;

  constructor() {}

  ngOnInit() {

  }

}
