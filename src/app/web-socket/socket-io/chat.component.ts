import {Component, OnDestroy, OnInit} from '@angular/core';
import {WebSocketService} from '../web.socket.service';
import {AuthService} from '../../auth/auth.service';
import {UserProfileModel} from '../../user-profile/user.profile.model';
import {UserProfileService} from '../../user-profile/user.profile.service';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-chat',
  templateUrl: 'chat.component.html',
  styleUrls: ['chat.component.css'],
  providers: [WebSocketService]

})

export class ChatComponent implements OnInit , OnDestroy{
  room: string = "Lobby";
  messageArray:Array<{user: String,message: String}>=[];
  messageText: string;
  userName: UserProfileModel;
  private userSub: Subscription;
  constructor(private chatService: WebSocketService, private authService: AuthService, private userProfileService: UserProfileService) {
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
    this.chatService.joinRoom({ user: this.authService.getUserNameFromLogin()[1] });
  }
  leave(){
    this.chatService.leaveRoom({ user: this.authService.getUserNameFromLogin()[1] });
  }
  sendMessage(){
    this.chatService.sendMessage({ user: this.authService.getUserNameFromLogin()[1], message: this.messageText});
  }

  ngOnInit() {
    this.authService.test();
    this.join();

    }


    ngOnDestroy(){
      this.userSub.unsubscribe();
      this.leave();
    }

}
