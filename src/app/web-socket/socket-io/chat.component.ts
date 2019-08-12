import {Component, OnInit} from '@angular/core';
import {WebSocketService} from '../web.socket.service';


@Component({
  selector: 'app-chat',
  templateUrl: 'chat.component.html',
  styleUrls: ['chat.component.css'],
  providers: [WebSocketService]

})

export class ChatComponent{
  user: string;
  room: string;
  messageArray:Array<{user: String,message: String}>=[];
  messageText: string;

  constructor(private chatService: WebSocketService) {
    this.chatService.newUserJoined().subscribe(data=>{
      this.messageArray.push(data);
    });
    this.chatService.userLeftRoom().subscribe(
      data=>{
        this.messageArray.push(data);
      });
    this.chatService.newMessageRecevied().subscribe(data => {
      this.messageArray.push(data);
    });
  }

  join() {
    this.chatService.joinRoom({ user: this.user, room: this.room });
  }
  leave(){
    this.chatService.leaveRoom({ user: this.user, room: this.room });
  }
  sendMessage(){
    this.chatService.sendMessage({ user: this.user, room: this.room, message: this.messageText});
  }

}
