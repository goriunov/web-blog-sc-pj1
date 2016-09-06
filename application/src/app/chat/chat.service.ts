import {Message} from "../shared/message";
import {EventEmitter} from "@angular/core";
declare var firebase:any;

export class ChatService{
  messages: Message[] = [];
  changedMessages = new EventEmitter();
  //Chat send message to the Database
  writeMessage(message: Message){
      this.messages.push(message);
    //Delete messages if more then 9 messages
    if(this.messages.length > 10){
      this.messages.splice(0, 1);
      firebase.database().ref('messages').set(this.messages);
    }else{
      firebase.database().ref('messages').set(this.messages);
    }

  }

  //Get messages from Database
  getMessagesOnInit(){

   firebase.database().ref('messages').on('value' , (snapshot)=>{
     if(snapshot.val() != null) {
       this.messages = snapshot.val();
     }else{
       this.messages = [];
     }
     this.changedMessages.emit(this.messages);
   });
  }


  //Check if user log in
  getCurrentUser(){
    var user = firebase.auth().currentUser;
    return user;

  }
}
