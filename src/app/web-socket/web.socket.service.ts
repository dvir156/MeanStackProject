import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {Observable, Subject} from 'rxjs';
import {UserProfileService} from '../user-profile/user.profile.service';
import {AuthService} from '../auth/auth.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {UserProfileModel} from '../user-profile/user.profile.model';

const BACKEND_URL = environment.apiUrl + "/userprofile/";

@Injectable({providedIn: 'root'})
export class WebSocketService {
  constructor(private userId: AuthService , private http: HttpClient) { }

  private socket = io('http://localhost:3000');

  joinRoom(data){
    console.log(data);
    this.socket.emit('join',data);
  }

  newUserJoined(){
    let observable = new Observable<{user:String, message:String}>(observer=>{
      this.socket.on('new user joined',(data)=>{
        observer.next(data);
      });
      return () => {this.socket.disconnect();}
    });
    return observable;
  }

  leaveRoom(data){
    this.socket.emit('leave',data);
  }

  userLeftRoom(){
    let observable = new Observable<{user:String, message:String}>(observer=>{
      this.socket.on('left room',(data)=>{
        observer.next(data);
      });
      return () => {this.socket.disconnect();}
    });
    return observable;
  }

  sendMessage(data){
    this.socket.emit('message',data);
  }

  newMessageRecevied(){
    let observable = new Observable<{user:String, message:String}>(observer=>{
      this.socket.on('new message',(data)=>{
        observer.next(data);
      });
      return () => {this.socket.disconnect();}
    });
    return observable;
  }


}

