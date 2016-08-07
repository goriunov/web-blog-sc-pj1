import { Component, OnInit } from '@angular/core';
import {ChatListComponent} from "./chat-list/chat-list.component";
import {Message} from "../shared/message";
import {ChatService} from "./chat.service";

@Component({
  moduleId: module.id,
  selector: 'app-chat',
  templateUrl: 'chat.component.html',
  styleUrls: ['chat.component.css'],
  directives:[ChatListComponent]
})
export class ChatComponent implements OnInit {
  messages : Message[];
  message : Message;
  messageContent = '';
  isAutorized= false;
  constructor(private chatService: ChatService) {}

  sendMessage(){
    let user = this.chatService.getCurrentUser();
    if(user) {
      this.message = new Message(user.displayName, this.messageContent);
      this.chatService.writeMessage(this.message);
      this.messageContent = '';
      this.autoScroll();
    }else{
      console.log('Not authorized');
      this.messageContent = 'Not authorized'
    }
  }

  ngOnInit() {
    let user =this.chatService.getCurrentUser();
    if(user){
      this.isAutorized = true;
    }
    this.chatService.getMessagesOnInit();
    this.chatService.changedMessages.subscribe(
      result => {
        this.messages = result;
        this.autoScroll();
      }
    );
  }

  autoScroll(){
    let user = this.chatService.getCurrentUser();
    if(user){
      this.isAutorized = true;
    }else{
      this.isAutorized = false;
    }
    setTimeout(function(){
      let el = document.getElementById('chat-scroll');
      el.scrollTop = el.scrollHeight;
    } , 300);
  }

  pressEnter(event){
    if(this.isAutorized) {
      if (this.messageContent.length > 1) {
        if (event.keyCode == 13) {
          this.sendMessage();
        }
      }
    }
  }


}
