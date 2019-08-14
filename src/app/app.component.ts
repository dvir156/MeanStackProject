import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth/auth.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private authService: AuthService, private titleService: Title ) {

  }
  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

  ngOnInit(){
    this.authService.autoAuthUser();
    this.setTitle('SocialNetwork');


  }

}
