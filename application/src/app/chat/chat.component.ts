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
  userEmail = '';
  isAutorized= false;

  constructor(private chatService: ChatService) {}

  sendMessage(){
    let user = this.chatService.getCurrentUser();
    if(user) {
      this.userEmail = user.email;
      this.message = new Message(user.displayName, this.messageContent , user.email);
      this.chatService.writeMessage(this.message);
      this.messageContent = '';
      this.autoScroll();
    }else{
      this.userEmail = '';
      console.log('Not authorized');
      this.messageContent = 'Not authorized'
    }
  }

  ngOnInit() {
    let user =this.chatService.getCurrentUser();
    if(user){
      this.isAutorized = true;
      this.userEmail = user.email;
    }else{
      this.userEmail = '';
      this.isAutorized = false;
    }
    this.chatService.getMessagesOnInit();
    this.chatService.changedMessages.subscribe(
      result => {
        if(result != null) {
          this.messages = result;
          this.autoScroll();
        }else{
          this.messages = [];
        }
      }
    );
  }

  autoScroll(){
    let user = this.chatService.getCurrentUser();
    if(user){
      this.isAutorized = true;
      this.userEmail = user.email;
    }else{
      this.isAutorized = false;
      this.userEmail = '';
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
