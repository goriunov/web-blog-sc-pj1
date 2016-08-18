import {Message} from "../shared/message";
import {EventEmitter} from "@angular/core";
declare var firebase:any;

export class ChatService{
  messages: Message[] = [];
  changedMessages = new EventEmitter();

  writeMessage(message: Message){
      this.messages.push(message);
    if(this.messages.length > 10){
      this.messages.splice(0, 1);
      firebase.database().ref('messages').set(this.messages);
    }else{
      firebase.database().ref('messages').set(this.messages);
    }

  }

  getMessagesOnInit(){

   firebase.database().ref('messages').on('value' , (snapshot)=>{
     if(snapshot.val() != null) {
       this.messages = snapshot.val();
     }else{
       this.messages = [];
     }
     this.changedMessages.emit(this.messages);
   });
   //   .then(
   //   data => {
   //     this.messages = data.val();
   //     this.changedMessages.emit(this.messages);
   //   },
   //   error => console.log(error)
   // );

  }

  getCurrentUser(){
    var user = firebase.auth().currentUser;

    return user;

  }
}
