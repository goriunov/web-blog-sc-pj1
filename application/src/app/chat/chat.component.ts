import { Component, OnInit } from '@angular/core';
import {Message} from "../shared/message";
import {ChatService} from "./chat.service";

@Component({
  selector: 'app-chat',
  templateUrl: 'chat.component.html',
  styleUrls: ['chat.component.css'],
})
export class ChatComponent implements OnInit {
  messages : Message[];
  message : Message;
  messageContent = '';
  userEmail = '';
  openChat: boolean = false;
  isAutorized= false;

  onOpenChat(){
      if(this.openChat){
        setTimeout(()=> {
          this.openChat = false;
        } , 600);
      }else{
        this.openChat = true;
      }
  }

  constructor(private chatService: ChatService) {}

  //Sand messages button
  sendMessage(){
    //Check if user in
    let user = this.chatService.getCurrentUser();
    if(user) {
      //create message and send it
      this.userEmail = user.email;
      this.message = new Message(user.displayName, this.messageContent , user.email);
      this.chatService.writeMessage(this.message);
      this.messageContent = '';
      //Auto scroll to bottom of chat
      this.autoScroll();
    }else{
      this.userEmail ='';
      //do not permit send
      console.log('Not authorized');
    }
  }


  ngOnInit() {
    //Check if user in
    let user =this.chatService.getCurrentUser();
    if(user){
      //give permission to chat
      this.isAutorized = true;
      this.userEmail = user.email;
    }else{
      this.userEmail = '';
      this.isAutorized = false;
    }
    //get messages fom DB
    this.chatService.getMessagesOnInit();
    this.chatService.changedMessages.subscribe(
      result => {
        if(result != null) {
          this.messages = result;
          //auto scroll to bottom
          this.autoScroll();
        }else{
          this.messages = [];
        }
      }
    );
  }

  //Function for auto scroll
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

  //can send messages on Enter button
  pressEnter(event){
    if ( this.isAutorized || this.messageContent.length > 1) {
      if (event.keyCode == 13) {
        this.sendMessage();
      }
    }
  }


}
